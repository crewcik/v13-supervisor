const { MessageEmbed } = require('discord.js')
const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'unban',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`Bu komutu kullanmak için yönetici olmalısınız. ${x.x}`)
        let id = args[0]
        if (!id) return message.reply(`Lütfen bir ID belirtin. ${x.x}`)
        if (isNaN(id)) return message.reply(`Geçersiz bir ID belirtiniz. ${x.x}`)
        if (id == message.author.id) return message.reply(`:d`)

        const embed = new MessageEmbed()
        .setDescription(`Başarıyla <@!${id}> isimli kullanıcının sunucudaki yasağı kaldırıldı.`)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v14 alt yapı' })
        message.reply({ embeds : [embed] })
        message.guild.members.unban(id)
    }
}