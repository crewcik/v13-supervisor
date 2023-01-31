const x = require('../crew.json')
const panel = require('../sunucu-panel.json')

module.exports = {
    kod: 'sil',
    async run (client, message, args) {
        if (!message.member.roles.cache.has(panel.staff) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(`Bu komutu kullanmak için yönetici veya staff rolünde olmalısınız. ${x.x}`)
        let miktar = args[0]
        if (!miktar) return message.reply(`Bir sayı belirtin. ${x.x}`)
        if (isNaN(miktar)) return message.reply(`Geçersiz sayı belirttiniz. ${x.x}`)
        if (miktar > 100 | miktar < 1) return message.reply(`Lütfen 1 veya 100 arasında bir rakam belirtiniz. ${x.x}`)

        message.channel.send(`Başarıyla **${miktar}** sayısında mesaj silindi. ✅`).then(crew => {
            setTimeout(() => {
                crew.delete()
            }, 7000)
        })
        message.channel.bulkDelete(miktar)
    }
}