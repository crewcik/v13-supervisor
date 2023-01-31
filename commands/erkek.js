const panel = require('../sunucu-panel.json')
const x = require('../crew.json')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    kod: 'e',
    async run (client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(panel['kayıtçı-rol'])) return message.reply(`Bu komutu yönetici veya kayıt sorumlusu kullanabilir. ${x.x}`)
        if (message.channel.id !== panel['kayıt-kanal']) return message.reply(`Bu komutu bu kanalda kullanamazsın.`)
        let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let isim = args[1]
        let yaş = args[2]
        if (!kullanıcı) return message.reply(`Lütfen bir kullanıcı veya kullanıcı ID belirtin. ${x.x}`)
        if (!isim) return message.reply(`Lütfen bir isim belirtin. ${x.x}`)
        if (!yaş) return message.reply(`Lütfen bir yaş belirtin. ${x.x}`)
        if (isNaN(isim)) return message.reply(`Geçersiz bir isim belirtiniz. ${x.x}`)
        if (kullanıcı.roles.cache.get(panel['erkek-rol-1'])) return message.reply(`Bu kullanıcı zaten kayıtlı. ${x.x}`)
        if (kullanıcı.roles.cache.get(panel['erkek-rol-2'])) return;
        if (kullanıcı.roles.cache.get(panel['erkek-rol-3'])) return;

        let toplamerkek = db.fetch(`toplam_erkek_${message.author.id}`)
        db.add(`toplam_erkek_${message.author.id}`, +1)

        const embed = new MessageEmbed()
        .setDescription(`${kullanıcı}, başarıyla ${message.author} yetkilisi tarafından kayıt edildi. ${x.o}`)
        .addFields(
            { name: 'Toplam erkek kayıt sayısı:', value: toplamerkek, inline: true }
        )
        .setColor('RANDOM')
        .setFooter({ Text: 'Crew v13 alt yapı'})
        message.reply({ embeds : [embed] })
        kullanıcı.roles.add(panel['erkek-rol-1'])
        kullanıcı.roles.add(panel['erkek-rol-2'])
        kullanıcı.roles.add(panel['erkek-rol-3'])
        kullanıcı.roles.remove(panel['kayıtsız-rol'])
        kullanıcı.setNickname(`${panel['tag']} ${isim} | ${yaş}`)

        client.channels.cache.get(panel['chat-kanal']).send(`${kullanıcı} Aramıza katıldı. Hoşgeldin demeyi unutmayın!`)
    }
 }