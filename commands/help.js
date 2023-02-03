const { MessageEmbed } = require('discord.js')
const x = require('../crew.json')

var p = x.prefix

module.exports = {
    kod: 'yardım',
    async run (client, message, args) {
        const crew = new MessageEmbed()
        .setDescription(`
        **${p}ban-sorgu @crew/ID**
        **${p}cmute @crew/ID <SÜRE> <SEBEP>**
        **${p}vmute @crew/ID <SÜRE> <SEBEP>**
        **${p}ban @crew/ID <SEBEP>**
        **${p}kick @crew/ID <SEBEP>**
        **${p}rol ver/al @crew/ID @rol/ID**
        **${p}sil <MİKTAR>**
        **${p}snipe**
        **${p}tag-sorgu <TAG>**
        **${p}unban <ID>**
        **${p}trolver**
        **${p}rank**
        **${p}e @crew/ID <İSİM> <YAŞ>**
        **${p}k @crew/ID <İSİM> <YAŞ>**
        `)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı'})
        .setThumbnail(message.author.avatarURL({ dynamic : true }))
        message.channel.send({ embeds : [crew] })
    }
}
