const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'cmute',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(panel['cmute-staff'])) return message.reply(`Bu komut için yetkiniz yetersiz. ${x.x}`)
        if (args[0] === "yardım") {
            const embed = new MessageEmbed()
            .setDescription(`
            Bir kullanıcıyı nasıl chat kanalında susturursunuz?

            **${x.prefix}cmute** -> Komut başlangıcı
            **${x.prefix}cmute @crew/ID** -> Kullanıcıyı etiketleme
            **${x.prefix}cmute @crew/ID <SÜRE>** -> Süre belirtme **Milisaniye üzerinden**
            **${x.prefix}cmute @crew/ID <SÜRE> <NEDEN>** -> Neden belirtme

            Bu şartları yerine getirerek sizde bir kullanıcıyı chat kanalında susturabilirsiniz.
            `)
            .setColor('RANDOM')
            .setFooter({ text: 'Crew v14 alt yapı' })
            message.reply({ embeds : [embed] })
        }
        let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let süre = args[1]
        let sebep = args.slice(2).join(' ')
        if (!kullanıcı) return message.reply(`Lütfen bir kullanıcı veya kullanıcı ID'si belirtiniz. ${x.x}`)
        if (!süre) return message.reply(`Geçerli bir süre beliriniz. ${x.x}`)
        if (!sebep) return message.reply(`Lütfen bir sebep belirtiniz. ${x.x}`)
        if (süre < 1000) return message.reply(`Lütfen geçerli bir zaman dilimi belirtin. Yardım isterseniz (**${x.prefix}cmute yardım**)`)
        if (kullanıcı.id == message.author.id) return message.reply(`Kendinize mute atamazsınız. ${x.x}`)
        if (kullanıcı.id == x.crew) return message.react('😂')
        if (kullanıcı.id == message.author.bot) return message.reply(`Bu bir kullanıcı değil bir bot. ${x.x}`)
        kullanıcı.roles.add(panel['cmute-rol']) 
        const embed = new MessageEmbed()
        .setDescription(`${kullanıcı} Başarıyla \`${sebep}\` nedeniyle **${süre}** kadar susturuldu. Artık chat kanallarına yazamaz.`)
        .setColor('RANDOM')
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic : true }), url: `https://discord.com/users/${x.crew}`})
        .setFooter({ text: 'Crew v13 alt yapı' })
        message.reply({ embeds : [embed] }).then(() => {
            setTimeout(() => {
                kullanıcı.roles.remove(panel['cmute-rol']) 
                const logs = new MessageEmbed()
                .setDescription(`Bir kullanıcının chat mutesi bitti!
                
                \`•\` Kullanıcı : ${kullanıcı} - (\`${kullanıcı.id}\`)
                \`•\` Yetkili : ${message.author} - (\`${message.author.id}\`)
                \`•\` Süre : **${süre}**
                \`•\` Sebep : **${sebep}**
                \`•\` Tarih : <t:${Math.floor(message.createdTimestamp / 1000)}> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)
                `)
                .setColor('RANDOM')
                .setFooter({ text: 'Crew v13 alt yapı' })
                client.channels.cache.get(panel['cmute-log']).send({ embeds : [logs] })
            }, süre)
        })
        const logs = new MessageEmbed()
        .setDescription(`
        Bir kullanıcı chat kanallarında susturuldu.

        \`•\` Kullanıcı : ${kullanıcı} - (\`${kullanıcı.id}\`)
        \`•\` Yetkili : ${message.author} - (\`${message.author.id}\`)
        \`•\` Süre : **${süre}**
        \`•\` Sebep : **${sebep}**
        \`•\` Tarih : <t:${Math.floor(message.createdTimestamp / 1000)}> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)
        `)
        .setColor('RANDOM')
        .setFooter({ text: 'Crew v13 alt yapı' })
        client.channels.cache.get(panel['cmute-log']).send({ embeds : [logs] })
    }
}
