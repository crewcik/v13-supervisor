const discord = require('discord.js')
const x = require('../crew.json')

module.exports = {
    kod: 'rol',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`Bu komutu yönetici kullanabilir. ${x.x}`)   
        if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`Bu komut için yetkim yetersiz. ${x.x}`)
        if (!args[0]) {
            const embed = new discord.MessageEmbed()
            .setDescription(`
            Bir kullanıcıya rol vermek için **${x.prefix}rol ver/al @rol/ID @kullanıcı/ID** 
            `)
            .setColor('RANDOM')
            .setFooter({ text: 'Crew v14 alt yapı'})
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
            message.reply({ embeds : [embed] })
        }
        if (args[0] === "ver") {
            let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[1])
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
            if (!kullanıcı) return message.reply(`Bir kullanıcı veya ID belirtin. ${x.x}`)
            if (!rol) return message.reply(`Bir rol veya ID belirtin. ${x.x}`)
            const embed = new discord.MessageEmbed()
            .setDescription(`${kullanıcı} başarıyla ${rol} isimli rol verildi.`)
            .setColor('RANDOM')
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
            .setFooter({ text: 'Crew v14 alt yapı'})
            message.reply({ embeds : [embed] })
            kullanıcı.roles.add(rol)
        }
        if (args[0] === "al") {
            let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[1])
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
            if (!kullanıcı) return message.reply(`Bir kullanıcı veya ID belirtin. ${x.x}`)
            if (!rol) return message.reply(`Bir rol veya ID belirtin. ${x.x}`)
            const embed = new discord.MessageEmbed()
            .setDescription(`${kullanıcı} başarıyla ${rol} isimli rol kullanıcıdan alındı.`)
            .setColor('RANDOM')
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
            .setFooter({ text: 'Crew v14 alt yapı'})
            message.reply({ embeds : [embed] })
            kullanıcı.roles.remove(rol)
        }
    }
}