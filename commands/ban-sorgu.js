const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'ban-sorgu',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(panel.staff)) return message.reply(`Bu komutu yönetici kullanabilir. ${x.x}`)  
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let sorgu = db.fetch(`ban_sorgu_${message.author.id}`)
        let tarih = db.fetch(`ban_sorgu_tarih_${message.author.id}`)
        let yetkili = db.fetch(`ban_sorgu_yetkili_${message.author.id}`)
        if (!user) return message.reply(`Lütfen bir kullanıcı ID'si belirtin. ${x.x}`) 
        if (!sorgu) return message.reply(`Bu kullanıcı yasaklı değil. ${x.x}`)
        const embed = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
        .setDescription(`
        ${user} isimli kullanıcının verisi: 
        Banlanma tarihi: **${tarih}**
        Sebep: **${sorgu}**
        Banlayan yetkili: **${yetkili}**
        `)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı'})
        message.reply({ embeds : [embed] })
       }
}
