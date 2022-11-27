const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const options = {
    intents: ["Guilds", "GuildMessages", "MessageContent","GatewayIntentBits.GuildVoiceStates"]
 };
const http = require('http');
http.createServer(function (req, res) {
  res.write("online");
  res.end();
}).listen(8080);
const Keyv = require('keyv');
const fetch = require('node-fetch')
const levels = new Keyv('sqlite://db.sqlite', { table: 'levels' });
const workerpool = require('workerpool')
const pool = workerpool.pool('./worker.js')
const moment = require('moment');
const channel = new Keyv(`sqlite://channels.sqlite`, { table: "channel" });
const role = new Keyv(`sqlite://roles.sqlite`, { table: "role" });
const log = new Keyv("sqlite://logs.sqlite", { table: "log" });
const config = require("./config.js");
const client = new Client({
  partials: ["CHANNEL"],
  intents: new Intents(32767),
  restTimeOffset: -1000
})
const prefix = "a."
const newbutton = (buttondata) => {
  return {
    components: buttondata.map((data) => {
      return {
        custom_id: data.id,
        label: data.label,
        style: data.style || 1,
        url: data.url,
        emoji: data.emoji,
        disabled: data.disabled,
        type: 2,
      };
    }),
    type: 1,
  };
};

client
  .on("debug", console.log)
  .on("warn", console.log)

client.on('ready', client => {
  console.log(`${client.user.tag}`)
  client.user.setActivity({
    type: 'PLAYING',
    name: `!ashelp`,
  });
  client.guilds.cache.size
  client.user.setStatus('online');
});

client.on("guildMemberAdd", member => {
    if (member.guild.id !== "1042943195018952866") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("1042943195845234772").send(`${member.user}が入社しました`);
});

client.on("guildMemberRemove", member => {
    if (member.guild.id !== "1042943195018952866") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("1043234408716570626").send(`${member.user}が退社しました`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
if(newState && oldState){
if(oldState.channelId===null && newState.channelId != null){
newState.guild.channels.cache.get("1043176271863095316").send(`${newState.member.user}が接続しました！`);
}
if(oldState.channelId !=null && newState.channelId === null){
oldState.guild.channels.cache.get("1043176271863095316").send(`${oldState.member.user}が切断しました！`);
}
}
});

client.on('message',message => {
if (message.guild.id !== "1042943195018952866") return;
if (message.content === 'ください') {
message.reply('あげない')
}
if (message.guild.id !== "1042943195018952866") return;
if (message.content === 'a.omi.t') {
message.reply('あなたの今日の運勢は！！')
}
if (message.guild.id !== "1042943195018952866") return;
if (message.content === 'a.omi.g') {
message.reply('あなたの今日の運勢は！！')
}
if (message.guild.id !== "1042943195018952866") return;
if (message.content.includes ('ひま')) {
message.reply('そっか…僕と遊ぼう!!')
}
if (message.author.bot) return;
if (message.guild.id !== "1042943195018952866") return;
if (message.content.includes ('暇')) {
message.reply('暇かよ働け')
}
if (message.author.bot) return;
if (message.guild.id !== "1042943195018952866") return;
if (message.content === ('a.')) {
message.reply('コマンドを指定してください')
}
});

client.on('messageCreate', async message => {
  if (message.content == 'よろしく') {
    message.channel.send("よろしく！入ってくれてありがとう！楽しんで！")
  };
  if (message.content == 'おはよう') {
    message.channel.send("おはよう！お前はよ起きろ！！")
  };
  if (message.content == 'おは') {
    message.channel.send("おは！！")
  };
  if (message.content == 'おやすみ') {
    message.channel.send("おやすみ！いい夢見やがれ！")
  };
  if (message.content == '各泥BANされますか？') {
    message.channel.send("黙れ")
  };
  if (message.content == 'よろしくお願いします') {
    message.channel.send("よろしく！")
  };
  if (message.content == 'いけぴち') {
    message.channel.send("ちんかす")
  };
  if (message.content == 'おはようございます') {
    message.channel.send("おはよう！！今日も一日頑張ろう！")
  };
  if (message.content == 'おやすみなさい') {
    message.channel.send("おやすみ～")
  };
  if (message.content == 'スクリプトの使い方教えてください') {
    message.channel.send("気合と根性")
  };
  if (message.content == 'スクリプトどうやって使うんですか？') {
    message.channel.send("気合と根性")
  };
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content.includes('よろ')) {
        message.channel.send('よろしくね');
    }
  　if (message.author.bot) return;
    if (message.content.includes('おは')) {
        message.channel.send('おはよう！はよ起きろ！！');
    }
  　if (message.author.bot) return;
    if (message.content.includes('おやす')) {
        message.channel.send('おやすみ！はよ寝ろ！！');
    }
});

client.on('messageCreate', async message => {
   if (!message.content.startsWith(prefix)) return
   const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
   if (command === 'add') {
     const [a, b] = args.map(str => Number(str))
     message.channel.send(`${a} + ${b} = ${a + b}`)
   }
 })

client.on('messageCreate', async message => {
   if (!message.content.startsWith(prefix)) return
   const [command, ...args] = message.content.slice(prefix.length).split(' ')
   const emojis = ['🇦', '🇧', '🇨', '🇩']
   if (command === 'vote') {
     const [title, ...choices] = args
     if (!title) return message.channel.send('タイトルを指定してください')
     if (choices.length < 2 || choices.length > emojis.length)
       return message.channel.send(`選択肢は2から${emojis.length}つを指定してください`); 
     const embed = new MessageEmbed()
       .setTitle(title)
       .setDescription(choices.map((c,i)=> `${emojis[i]} ${c}`).join('\n'))
     const poll = await message.channel.send({
       embeds: [embed]
     });
     emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
     embed.setFooter({
     	text: `集計時は a.endvote ${poll.channel.id} ${poll.id} と送信してください。`
     })
     poll.edit({embeds:[embed]});
     return;
   }
   if (command === 'endvote') {
   	const [cid, mid] = args;
   	if (!cid || !mid) return message.channel.send('IDが指定されていません。');
   	const channel = await message.guild.channels.fetch(cid);
   	const vote = await channel.messages.fetch(mid);
   	if (vote.author.id !== client.user.id) return;
   	if (vote.embeds[0]) return;
   	let result = "投票結果";
   	for (let i = 0; vote.reactions.cache.get(emojis[i]) && i < emojis.length; i++){
   		const reaction = vote.reactions.cache.get(emojis[i])
   		result = `${result}\n${emojis[i]}：${reaction.users.cache.has(client.user.id)?reaction.count-1:reaction.count}票`
   	}
   	vote.reply({
   		embeds:[
   			new Discord.MessageEmbed()
   				.setTitle(vote.embeds[0].title)
   				.setDescription(result)
   		]
   	})
   }
 })

const GUILD = '1042943195018952866' // 動作させるサーバーのID
const CHANNEL = '1043525802379190272' // 名前を変更するチャンネルのID

// ボットがオフラインのときの変更は出来ないから、起動時に辻褄を合わせる
client.on('ready', () => {
  const guild = client.guilds.cache.get(GUILD)
  const channel = guild.channels.cache.get(CHANNEL)
  channel.setName('severmember: ' + guild.memberCount)
})

// メンバーが参加したらチャンネル名を更新する
client.on('guildMemberAdd', member => {
  // 指定したサーバーでのみ実行する
  if (member.guild.id === GUILD) {
    // チャンネルを取得して、名前を更新する
    const channel = member.guild.channels.cache.get(CHANNEL)
    channel.setName('severmember: ' + member.guild.memberCount)
  }
})

// メンバーが退出したらチャンネル名を更新する（処理は上と同じ）
client.on('guildMemberRemove', member => {
  if (member.guild.id === GUILD) {
    const channel = member.guild.channels.cache.get(CHANNEL)
    channel.setName('severmember: ' + member.guild.memberCount)
  }
})

client.on('messageCreate', message => {
   if (message.content === 'a.day') {
  const week = ['日', '月', '火', '水', '木', '金', '土']
  const date = new Date()
  const day = date.getDay()
  const embed = new MessageEmbed()
       .setTitle('今日の日付')
       .addField('😁', '今日は' + week[day] + '曜日でえす')
  .setColor('RANDOM')
       .setTimestamp()
     message.reply({ embeds: [embed] })
    }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return
  if (message.content.includes ('とは')) {
    message.react('🔍')
  }
})

client.on('messageCreate', async message => {
  if (message.content === 'a.prompt') {
    message.channel.send('はい か いいえ を送信してください')
    const filter = msg => msg.author.id === message.author.id
    const collected = await message.channel.awaitMessages({ filter, max: 1, time: 10000 })
    const response = collected.first()
    if (!response) return message.channel.send('タイムアウト')
    if (!['はい', 'いいえ'].includes(response.content)) return message.channel.send('正しくありません')
    message.channel.send(`${response.content} が送信されました`)
  }
})

client.on("guildMemberRemove", member => {
  if (message.content == 'a.user') {
  const period = Math.round((Date.now() - member.joinedAt) / 86400000) // サーバーに居た期間を日数にして計算

  console.log(`${member.user.tag}は${member.guild.name}に約${period}日間サーバーに参加していました。`)
    }
});
  
client.on('messageCreate', message => {
   if (message.content === 'a.oisii') {
     const embed = new MessageEmbed()
       .setTitle('るしかすちんぽ')
       .addField('顔射顔射', '美味しいヤミー❗️✨🤟😁👍✨⚡️感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🥓🥩🍗🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼😁🙏✨ハッピー🌟スマイル❗️❗️💥✨👉😁👈⭐️')
    .setImage('https://media.tenor.com/QXexKluUEToAAAAd/skypeace-%E3%82%B9%E3%82%AB%E3%82%A4%E3%83%94%E3%83%BC%E3%82%B9.gif')
     .setColor('RANDOM')
       .setTimestamp()
     message.channel.send({ embeds: [embed] })
   }
 });
  
client.on('messageCreate', message => {
   if (message.content === 'a.ashelp') {
     const embed = new MessageEmbed()
       .setTitle('機能一覧')
       .addField('入室、退出ログ', 'ユーザーの入退室ログが表示されます')
       .addField('挨拶、自動応答', '基本的な挨拶や特定のワードに自動応答します')
       .addField('BAN機能', '指定のユーザーをBANします')
       .addField('kick機能', '指定のユーザーをkickします')
       .addField('認証機能', '認証設定、認証パネル設置を実行')
       .addField('投票機能', '!vote タイトル　選択肢　で投票パネルを設置')
       .addField('画像表示機能', '予め追加してある画像を表示')
       .addField('音楽再生機能', '!play 曲名で希望の音楽を再生できます※ボイスチャンネル接続必須※')
       .addField('おみくじ機能','おみくじが引けます')
       .addField('エロ機能','ランダムに表示されます')
       .addField('レベリング機能','簡単なレベル機能です')
       .addField('BANユーザー確認','サーバーでBANしたユーザーを確認できます')
       .setTitle('コマンド一覧')
       .setDescription('Aserora公式bot')
        .setAuthor({ name: 'Aserora', iconURL: 'https://media.discordapp.net/attachments/1028521169697124372/1038913587810414642/Screenshot_2022-10-30-05-16-28-48_680d03679600f7af0b4c700c6b270fe7.jpg?width=539&height=537' })
       .setThumbnail('https://media.discordapp.net/attachments/1028521169697124372/1038913587810414642/Screenshot_2022-10-30-05-16-28-48_680d03679600f7af0b4c700c6b270fe7.jpg?width=539&height=537')
        .setImage('https://media.discordapp.net/attachments/1028521169697124372/1038913587810414642/Screenshot_2022-10-30-05-16-28-48_680d03679600f7af0b4c700c6b270fe7.jpg?width=539&height=537')
       .addField('BAN機能', 'a.ban')
       .addField('kick機能', 'a.kick')
       .addField('認証設定', 'a.set')
       .addField('認証パネル設置', 'a.run')
       .addField('投票機能', 'a.vote')
       .addField('指定しているチャンネルid、ロールid、ログチャンネルidを表示', 'a.check')
       .addField('画像を表示', 'a.images')
       .addField('おみくじ機能テキスト版','a.omi.t')
       .addField('おみくじ機能画像版','a.omi.g')
       .addField('エロ機能','a.ero')
              .addField('その他ネタ機能①','a.oisii 感謝感謝を表示')
       .addField('その他ネタ機能②','a.yajyuu 野獣先輩をランダムで召喚します')
       .addField('レベル確認','a.rank')
       .addField('BANユーザー確認','a.bans')
       .addField('[!command]音楽再生その他help', '!aserora')
       .setColor('RANDOM')
       .setTimestamp()
     message.channel.send({ embeds: [embed] })
   }

if (message.content === 'a.omi.t') {
     const embed = new MessageEmbed()
　　　const 小吉 = [{title: "小吉", }, {title: "吉", }, {title: "末吉", },{title: "大吉", },{title: "中吉", },{title: "凶", },{title: "大凶", },]
const RandomNum = Math.floor(Math.random()*小吉.length);
message.channel.send({embeds:[小吉[RandomNum]]});
   }
});

client.on('messageCreate', message => {
if (message.content === "a.ero") {
const A = new MessageEmbed()
.setImage("https://livedoor.sp.blogimg.jp/s807319-doujinerosenka/imgs/c/9/c9f9d82d.jpg")

const B = new MessageEmbed()
.setImage("https://livedoor.blogimg.jp/s807319-doujinerosenka/imgs/c/4/c4ce0c1d-s.jpg")

const C = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEU6JAls58bUMfg1a627hVFIdHhyT97UOmtDoa3HILJ-vn5DSQs_V8jxdjiF3mKjJWeQq7VnQVZXqVQsBShlDGJ_Cj5cf7P2hfMl9eWCHl4WrF6S_Np5daks1qxOyyuDoh6VinXV1X0W1aXTHOmj2rA=w505-h607-no?authuser=1")

const D = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEVj8iwoc7kMZgJRW1JlkgZrnGI9tqy25lc3Ay2rFUqPZVZpLYMqjt8yLlSwj6LqY_khZtYcn-J0wpNETMe-TSw7Oc8D4Wbh2hBFn_02NzISZxVqiQzXwEIjtVPWOUbpjx1Mbhm-R8HFfv-bK3wv47g=w465-h659-no?authuser=0")

const E = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEUqhTO96cGzM-AHe3MucdJBLGnQYfhNNkk-c8xz6ywXo_DX6iZiqQsGqDHvr0aXv4VekkAzFXSJUNf0AewTLiH9E6-V7Ng6w6lCQFcQS2TUnBscCZNuGdKPCCJXEeyl4qk2Jr6KJxWGQRZkcP4Bmvw=w468-h655-no?authuser=0")

const F = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEUgZocuFhRlh_kc20S8Qn0lb0NXkWCWgFoYqe-AlaCUGfbxxRrZdAjFDTkIy9XwAa6uUmqp0e-ep-AS5glStMKiWuUhDAT-L4J5El_PhUq8V_43REmfeXMtPh98g5nKHNlpXhpKX8n2Cjl0cZyYdJg=w414-h741-no?authuser=0")

const G = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEUgZocuFhRlh_kc20S8Qn0lb0NXkWCWgFoYqe-AlaCUGfbxxRrZdAjFDTkIy9XwAa6uUmqp0e-ep-AS5glStMKiWuUhDAT-L4J5El_PhUq8V_43REmfeXMtPh98g5nKHNlpXhpKX8n2Cjl0cZyYdJg=w414-h741-no?authuser=0")

const H = new MessageEmbed()
.setImage("https://lh3.googleusercontent.com/pw/AL9nZEXFPVmB3gjanCkE9FxGHUH07UMCPncTyEqlX5yzlDQ3TG28udzYcRiNxXrVZT77k-7R5mkulH-qIa_2aiJJ3Ar69uJ9Ng6xRJUjGFZ_G-lD-sw14CRRmxmZ5TbPmquQczG63vCyM7ZYbEHbItCFUck=w491-h625-no?authuser=0")

let arr =[A,B,C,D,E,F,G,H];
var random = Math.floor(Math.random() * arr.length);
var res = arr[random];
message.channel.send({ embeds: [res]});
console.log("OK！")
}
if (message.content === "a.yajyuu") {
const A = new MessageEmbed()
.setTitle('今日の野獣')
.setImage("https://img.gifmagazine.net/gifmagazine/images/4171719/original.gif")

const B = new MessageEmbed()
.setTitle('今日の野獣')
.setImage("https://media.tenor.com/Alrt3SsaaSkAAAAC/maruyakisan-homo.gif")

const C = new MessageEmbed()
.setTitle('今日の野獣')
.setImage("https://i.kym-cdn.com/photos/images/newsfeed/001/474/820/a01.gif")

const D = new MessageEmbed()
.setTitle('今日の野獣')
.setImage("https://img.gifmagazine.net/gifmagazine/images/2971470/original.gif")

const E = new MessageEmbed()
.setTitle('今日の野獣')
.setImage("https://pbs.twimg.com/media/CTctIUZVEAANBpl.jpg")

let arr =[A,B,C,D,E];
var random = Math.floor(Math.random() * arr.length);
var res = arr[random];
message.channel.send({ embeds: [res]});
console.log("OK！")
}
if (message.content === "a.omi.g") {
const 大吉 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003220.png")

const 中吉　= new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003222.png")

const 小吉 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003223.png")

const 末吉 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003224.png")

const 吉 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003221.png")

const 凶 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003225.png")

const 大凶 = new MessageEmbed()
.setTitle('今日の運勢')
.setImage("https://kohacu.com/wp-content/uploads/2021/01/kohacu.com_samune_003226.png")
  
let arr =[大吉,中吉,小吉,末吉,吉,凶,大凶];
let weight = [15, 25, 20, 20, 15, 10, 5];
var random = Math.floor(Math.random() * arr.length);
var res = arr[random];
message.channel.send({ embeds: [res]});
console.log("OK！")
}
 });

client.on('messageCreate', async (message) => {
  // ボットは除外する
  if (message.author.bot) return;

  // ユーザーのレベルを取得する。なければ{ count: 0, level: 0 }にする
  const level = (await levels.get(message.author.id)) || { count: 0, level: 0 };

  // カウントを1増やす
  level.count += 1;
  // カウントが100になったら0にして、レベルを1増やす
  if (level.count >= 500) {
    level.count = 0;
    level.level += 1;
  }

  // ユーザーのレベルを保存する
  levels.set(message.author.id, level);

  // !levelコマンドで現在のレベルを出す
　if (message.content === 'a.rank') {
   const embed = new MessageEmbed()
       .setTitle('ランク')
       .addField(`現在のレベルは ${level.level} です。現在のxpは ${0 + level.count}`, `次のレベルまで ${500 - level.count}`)
   .setColor('RANDOM')
       .setTimestamp()
     message.reply({ embeds: [embed] })
   }
 });

client.on('messageCreate', async message => {
  if (message.content === 'a.bans' && message.guild) {
    const bans = await message.guild.bans.fetch()
    message.channel.send(bans.map(ban => ban.user.tag).join(', ') || 'none')
  }
})
  
client.on('messageCreate', async message => {
  const arg = message.content.slice(prefix.length).split(/ +/);
  const command = arg.shift().toLowerCase();
  if(message.author.bot || message.channel.type == "DM" || !message.content.startsWith(prefix)){
    return;
  }

 if (command == "k") {
message.channel.send({ content:"野生のこうきが現れた！！HP10000", files: ["https://cdn.discordapp.com/emojis/1029771930611499080.webp?size=128&quality=lossless"] });
 }
  
  if (command == "unban") {
message.guild.members.unban('message.mentions.members', '理由(オプション)')
  .then(user => console.log(`${user.tag}のBANを解除`))
  .catch(console.error)
}
  if(command == "kick"){
    const embed = new MessageEmbed()
    if(!message.member.permissions.has("KICK_MEMBERS")){
      return message.reply("使用権限がありません。")
    }
    let user;
    if(message.mentions.members.first()){
      user = message.mentions.members.first();
      embed
        .setDescription(`${user}をKICKしました。`)
    }else if(message.content.match(/ /)){
      user = message.guild.members.cache.get(message.content.slice(prefix.length+5).trim())
      embed
        .setDescription(`<@${message.content.slice(prefix.length+5).trim()}>をKICKしました。`)
    }else{
      return message.reply("メンションまたはIDが入力されていません。")
    }
    if(!user.kickable){
      return message.reply("このメンバーはKICKすることができません。")
    }
    await user.kick();
    embed
      .setTitle("Success")
      .setColor("RANDOM")
    message.reply({ embeds:[embed] })
  }
  if(command == "ban"){
    const embed = new MessageEmbed()
    if(!message.member.permissions.has("BAN_MEMBERS")){
      return message.reply("使用権限がありません。")
    }
    let user;
    if(message.mentions.members.first()){
      user = message.mentions.members.first();
      embed
        .setDescription(`${user}をBANしました。`)
    }else if(message.content.match(/ /)){
      user = message.guild.members.cache.get(message.content.slice(prefix.length+5).trim())
      embed
        .setDescription(`<@${message.content.slice(prefix.length+4).trim()}>をBANしました。`)
    }else{
      return message.reply("メンションまたはIDが入力されていません。")
    }
    if(!user.bannable){
      return message.reply("このメンバーはBANすることができません。")
    }
    await user.ban();
    embed
      .setTitle("Success")
      .setColor("RANDOM")
    message.reply({ embeds:[embed] })
  }
  if(command == "set"){
    if(message.author.id != message.guild.ownerId){
      return message.reply("This command can only use by server owner.")
    }
    message.reply({
      content: "下のメニューから選択してください",
      components: [
        newbutton([
          { id: "channel", label: "SetChannel" },
          { id: "role", label: "SetRole" },
          { id: "logch", label: "SetLogChannel" }
          ]),
        ],
    });
  }
  if(command == "check"){
    const ch = await channel.get(message.guild.id)
    const ro = await role.get(message.guild.id)
    const lo = await log.get(message.guild.id)
    const embed = new MessageEmbed()
    .setTitle("Information:")
    .addField("= Channel =", ch ?? "None")
    .addField("= Role =", ro ?? "None")
    .addField("= LogChannel =", lo ?? "None")
    .setColor("RANDOM")
    message.reply({ embeds: [embed] });
    }
  if(command == "run"){
    if(message.author.id != message.guild.ownerId){
      return message.reply("This command can only use by server owner.")
    }
    const runch = await channel.get(message.guild.id)
    const runro = await role.get(message.guild.id)
    if(!runch || !runro){
      return message.reply("チャンネルかロール、または両方が登録されていません。\n`!set`で登録してください。")
    }
    const embed = new MessageEmbed()
    .setTitle("下のボタンを押して認証してね！")
    .setColor("RANDOM")
    message.guild.channels.cache.get(runch).send({
      embeds: [embed],
      components: [
        newbutton([
          { id: "ninsyou", label: "認証", style: 3 }
          ]),
        ]
    })
  }
});

client.on("interactionCreate", async interaction => {
  try{
  if(interaction.customId == "channel"){
    interaction.message.delete()
    interaction.message.channel.send("認証に使いたいチャンネルのIDを送信してください。").then(() => {
      interaction.message.channel.awaitMessages({
        max: 1,
        time: 60000,
        errors: ["time"]
      })
      .then(message => {
        message = message.first()
        if(message.author.id != message.guild.ownerId){
          return message.reply("You are not server owner.")
        }
        const channelid = message.guild.channels.cache.get(message.content);
        if (!channelid){
          return message.reply(`チャンネルが見つかりませんでした。QUIT`);
        }
        message.reply(`Set channelID:${message.content}`)
        channel.set(message.guild.id, message.content)
      })
      .catch(collected => {
        interaction.message.delete()
        interaction.message.channel.send("Timeout")
      })
    })
  }
  if(interaction.customId == "role"){
    interaction.message.delete()
    interaction.message.channel.send("認証に使いたいロールのIDを送信してください。").then(() => {
      interaction.message.channel.awaitMessages({
        max: 1,
        time: 60000,
        errors: ["time"]
      })
      .then(message => {
        message = message.first()
        if(message.author.id != message.guild.ownerId){
          return message.reply("You are not server owner.")
        }
        const roleid = message.guild.roles.cache.get(message.content);
        if (!roleid){
          return message.reply(`ロールが見つかりませんでした。QUIT`);
        }
        message.reply(`Set roleID:${message.content}`)
        role.set(message.guild.id, message.content)
      })
      .catch(collected => {
        interaction.message.delete()
        interaction.message.channel.send("Timeout")
      })
    })
  }
    if(interaction.customId == "logch"){
      interaction.message.delete()
      interaction.message.channel.send("認証のログを流したいチャンネルのIDを送信してください。\ndisableと送信するとオフにできます。").then(() => {
        interaction.message.channel.awaitMessages({
          max: 1,
          time: 60000,
          errors: ["time"]
        })
        .then(async message => {
          message = message.first()
          if(message.author.id != message.guild.ownerId){
            return message.reply("You are not server owner.")
          }
          if(message.content == "disable"){
            const id = await log.get(message.guild.id)
            if(!id){
              return message.channel.send("ログのチャンネルが登録されていません。")
            }else{
              await log.delete(message.guild.id)
              return message.channel.send("情報をdeleteしました。")
            }
          }
          const channelid = message.guild.channels.cache.get(message.content);
          if (!channelid){
            return message.reply(`チャンネルが見つかりませんでした。QUIT`);
          }
          message.reply(`Set LogChannelID:${message.content}`)
          log.set(message.guild.id, message.content)
        })
        .catch(collected => {
          interaction.message.delete()
          interaction.message.channel.send("Timeout")
        })
      })
    }
    if(interaction.customId == "ninsyou"){
      const getrole = await role.get(interaction.guildId)
      interaction.reply({ embeds: [
        new MessageEmbed().setTitle("認証成功！").setColor("RANDOM")
      ],
      ephemeral: true
     })
      setTimeout(async () => {
       await interaction.member.roles.add(getrole);
      }, 3000)
      const logchid = await log.get(interaction.message.guild.id)
      if(!logchid){
        return;
      }else{
        const logembed = new MessageEmbed()
        .setTitle("認証ログ")
        .setDescription("認証者の情報です。")
        .addField("= 名前 =",`${interaction.user.username}`)
        .addField("= ID =",`${interaction.user.id}`)
        .addField("= 入鯖時刻 =", `${moment(interaction.member.joinedAt).format('MM/DD/YYYY, hh:mm:ss A')}`)
        .addField("= アカウント作成時刻 =", `${moment(interaction.member.user.createdAt).format('MM/DD/YYYY, hh:mm:ss A')}`)
        .setTimestamp()
        .setThumbnail(interaction.member.displayAvatarURL())
        .setColor("RANDOM")
        interaction.message.guild.channels.cache.get(logchid).send({ embeds: [logembed] })
        }
    }
    }catch(err){
      const error = err.toString().replace("\n"," ]\n[ ")
      interaction.message.reply(`>>> **[ ${error} ]**`)
    }
});

client.login(config.token);