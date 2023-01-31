const { Collection, Client, Intents, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")
const crew = require('./crew.json');
const fs = require('fs');
const moment = require("moment")
const panel = require('./sunucu-panel.json')
require("moment-duration-format")
const os = require("os")
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    activities: [{
      name: `https://github.com/Crewlua`,
      type: "WATCHING",
    }],
    status: "dnd",
  }
});
const { readdirSync } = require('fs');
const { join } = require('path');
const db = require('quick.db')

var prefix = crew.prefix

client.commands = new Discord.Collection();


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.kod, command);
  console.log(`${file} - Yüklendi. - [${moment(Date.now()).format('LLL')}]`);
}


client.on("message", async message => {

  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;


    try {
      client.commands.get(command).run(client, message, args);

    } catch (error) {
      console.log(`Bir hata var!` + error);
    }
  }
})


client.on('ready', () => {
  console.log(`${client.user.tag} | Olarak giriş sağladım.`)
  db.set(`bot_baglandi_${client.user.tag}`, client.users.cache.size)
  console.log(`Database başarıyla bağlandı. ✅`)
})

const { joinVoiceChannel } = require('@discordjs/voice');
client.on('ready', () => {
  setInterval(() => {
    joinVoiceChannel({
      channelId: panel.ses,
      guildId: panel.sunucuıd,
      adapterCreator: client.guilds.cache.get(panel.sunucuıd).voiceAdapterCreator
    })
  }, 1000)
})

client.on('messageCreate', message => {
  if (message.content.toLocaleLowerCase() === crew.prefix + "tag") {
    message.reply(panel.tag)
  }
})
client.on('messageCreate', message => {
  if (message.content.toLocaleLowerCase() === "tag") {
    message.reply(panel.tag)
  }
})

client.on("messageDelete", async (message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let snipe = {
    mesaj: message.content,
    mesajyazan: message.author.id,
    ytarihi: message.createdTimestamp,
    starihi: Date.now(),
    kanal: message.channel.id
  }
  await db.set(`snipe.${message.guild.id}`, snipe)
});


client.on('guildMemberAdd', member => {
  let kurulum = (Date.now() - member.user.createdTimestamp);
  if (kurulum > 604800000) {
      güvenli = "Güvenilir"
  } else {
      süpheli = "Şüpheli"
  }

  client.channels.cache.get(panel['kayıt-kanal']).send(`
  Sunucuya hoşgeldin ${member}!

  Seninle beraber **${member.guild.memberCount}** kişi sayısına ulaştık.

  Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) kurulmuş.
  Hesabın **${kurulum}**

  <@&${panel['kayıtçı-rol']}> Rolündeki yetkililer seninle ilgilenicektir.
  `)
  member.setNickname(`${panel.tag} İsim | Yaş`)
  member.roles.add(panel['kayıtsız-rol'])
})

client.login(crew.token).then(console.log("Token başarıyla aktif edildi."))