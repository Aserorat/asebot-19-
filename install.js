const Discord = require("discord.js");
const client = new Discord.Client({
  intents: 0
});

client.on('messageCreate', async message => {
    if (message.content.startsWith("?bt")) {
        const tic1 = new Discord.MessageButton()
            .setCustomId("contact") //buttonにIDを割り当てる   *必須
            .setStyle("PRIMARY")	　//buttonのstyleを設定する  *必須
            .setLabel("🎫問い合わせ🎫")
        await message.channel.send({
            content: "お問い合わせはこちらから",
            components: [new Discord.MessageActionRow().addComponents(tic1)]
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "contact") {
        await interaction.reply({
            content: "ボタンが押されました。",
            ephemeral: true
        });
    }
});

client.login(config.token);