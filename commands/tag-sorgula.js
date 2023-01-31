const { MessageEmbed } = require('discord.js')
const cw = require('../crew.json')

module.exports = {
    kod: 'tag-sorgu',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`Bu komutu **YÖNETİCİ** Olmanız gerekmektedir. ${cw.x}`)
        let tag = args[0]
        if (!tag) return message.reply(`Lütfen bir tak belirtin. ${cw.x}`)

        let usersayı = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size

        const embed = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${cw.crew}`})
        .setDescription(`**${tag}** Şuanda (**${usersayı}**) kişi'nin isminde bulunuyor.`)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v14 alt yapı'})
        message.reply({ embeds : [embed] })
    }
}