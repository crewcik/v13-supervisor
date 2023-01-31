const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const x = require('../crew.json')

module.exports = {
    kod: 'rank',
    async run (client, message, args) {
        let erkek = db.fetch(`toplam_erkek_${message.author.id}`) || "0"
        let kadın = db.fetch(`toplam_kadın_${message.author.id}`) || "0"
        let toplam = db.add(erkek += kadın) || "0"

        const embed = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
        .addField('Erkek teyit:', "```js\n" + erkek + "```")
        .addField('Kadın teyit:', "```js\n" + kadın + "```")
        .addField('Toplam teyit:', "```js\n" + toplam + "```")
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı'})
        message.reply({ embeds : [embed] })
    }
}