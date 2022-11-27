const Discord = require("discord.js");
const client = new Discord.Client({ intents: 0, partials: ["GUILD_MEMBER", "USER"] });
/**
 * 
 * @param {unknown} err 
 * @param {object} ctx
 * @param {Discord.ButtonInteraction} ctx.interaction 
 * @param {Discord.Snowflake} ctx.role_id
 * @param {string} ctx.role_mention
 * @returns 
 */
async function handleError(err, { interaction, role_id, role_mention }) {
  if (err instanceof Discord.DiscordAPIError) {
    switch (err.code) {
      case 10011:
        await interaction.followUp(`役職の付与に失敗しました。\n付与しようとした役職(id: \`${role_id}\`)は存在しません。\n(サーバ管理者へ連絡してください。)`);
        return;
      case 50013:
        await interaction.followUp(
          `${role_mention}の付与に失敗しました。\nBotに十分な権限がありません。\n(サーバ管理者へ連絡してください。)`,
        );
        return;
    }
  }
  interaction.followUp(`${role_mention}の付与に失敗しました。\n時間をおいてやり直してください。`).catch(() => { });
  throw err;
}
/**
 * 
 * @param {Discord.ButtonInteraction} interaction 
 * @param {URLSearchParams} params 
 * @returns 
 */
async function rolePanel(interaction, params) {
  /** @type {Discord.Snowflake} */
  const role_id = params.get("rid");
  await interaction.deferReply({
    ephemeral: true
  });
  const guild = await interaction.guild.fetch();
  // APIからのメンバーオブジェクト(discord.jsのGuildMemberでないもの)がそのまま渡ってくることがあるのでfetchすることで確実にGuildMemberとする。
  // interaction.member.user.idでなければならない。なぜならば、APIInteractionGuildMemberはid を直接持たないからである。
  const member = await guild.members.fetch(interaction.member.user.id,{
    force: true // intentsによってはGuildMemberUpdateが配信されないため
  });
  const role_mention = `<@&${role_id}>`;
  if (member.roles.resolve(role_id)) {
    await interaction.followUp(`すでに、${role_mention}を持っています。`);
    return;
  }
  try {
    await member.roles.add(role_id);
  } catch (err) {
    await handleError(err, { interaction, role_id, role_mention });
    return;
  }
  await interaction.followUp({
    content: `${role_mention} を付与しました。`
  });
}
const buttons = {
  rp: rolePanel
};
/**
 * 
 * @param {Discord.Interaction} interaction 
 */
async function onInteraction(interaction) {
  if (!interaction.isButton()) {
    return;
  }
  const params = new URLSearchParams(interaction.customId);
  await buttons[params.get("d")](interaction, params);
}
client.once("ready", () => {
  console.log(`Logged in as: ${client.user.username}#${client.user.discriminator}`);
  // ready後にready以前に実行されたinteractionのinteractionCreateがemitされるが、そのときにはinteractionがtimeoutしておりfollowupで失敗することがよくある。
  // そのようなことを避けるためready内でハンドラを登録する。
  client.on("interactionCreate", (interaction) => onInteraction(interaction).catch(err => console.error(err)));
});
client.login(config.token);