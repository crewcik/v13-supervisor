const Discord = require('discord.js')
const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'kick',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(panel['ban-hammer'])) return message.reply(`Bu komutu yönetici kullanabilir. ${x.x}`)
        let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let sebep = args.slice(1).join(' ') || 'Belirtmedi'
        if (!kullanıcı) return message.reply(`Bir kullanıcı veya kullanıcı ID'si belirtin. ${x.x}`)
        if (kullanıcı.id == x.crew) return message.react(`😂`)
        if (kullanıcı.id == message.author.id) return message.reply(`Kendini atamazsın. ${x.x}`)
        if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`Bu kullanıcı benden üst yetkide olduğu için kullanıcıyı atamam. ${x.x}`)
        const embed = new Discord.MessageEmbed()
        .setDescription(`${kullanıcı} başarıyla **${sebep}** nedeniyle ${message.author} tarafından sunucudan atıldı.`)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı'})
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
        message.reply({ embeds : [embed] })
        kullanıcı.kick({ reason: sebep })
    }   
}
