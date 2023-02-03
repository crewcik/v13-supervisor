const { MessageEmbed } = require('discord.js')
const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'trolver',
    async run (client, message, args) {
        if (message.author.id !== x.crew) return;
        let tag = panel.tag
        let rol = panel['tag-rol']
        message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
        const embed = new MessageEmbed()
        .setDescription(`İsminde **${tag}** olan kişilere <@&${rol}> isimli rol verilecek.`)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı' })
        message.reply({ embeds : [embed] })
    }
}
