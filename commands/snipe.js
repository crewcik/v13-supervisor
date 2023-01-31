const db = require('quick.db')
const panel = require('../sunucu-panel.json')
const x = require('../crew.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    kod: 'snipe',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(panel.staff)) return message.reply(`Bu komutu için staff rolünde olmalısınız. ${x.x}`)
        let data = db.fetch(`snipe.${message.guild.id}`)
        const embed = new MessageEmbed()
        .setDescription(`
        • Mesaj sahibi : <@${data.mesajyazan}>
        • Kanal : <#${data.kanal}>
        • Mesaj : **${data.mesaj}**
        • Yazılma tarihi : <t:${Math.floor(data.ytarihi / 1000)}> (<t:${Math.floor(data.ytarihi / 1000)}:R>)
        • Silinme tarihi : <t:${Math.floor(data.starihi / 1000)}> (<t:${Math.floor(data.starihi / 1000)}:R>)
        `)
        .setColor('000a37')
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
        .setFooter({ text: 'Crew v14 alt yapı '})
        message.reply({ embeds : [embed] }).then(crew => { setTimeout(() => { crew.delete() }, 10000)})
        await message.react('✅')
        db.delete(`snipe.${message.guild.id}`)
    }
}