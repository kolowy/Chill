const { MessageEmbed} = require("discord.js");
const Topgg = require(`@top-gg/sdk`)

const api = new Topgg.Api(process.env.TOPGG)

module.exports.run = (client, message, args) => {
    let userToken = AuthUser(message.author.id)    
    userToken.then(function(result) {
       if(result != true){
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Votez !')
            .setDescription('Voter nous aide à partager le bot, merci à vous !')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('top.gg', 'https://top.gg/bot/752812712165376083/vote', true)
            .setURL('https://top.gg/bot/752812712165376083/vote')
            .setFooter('Merci, vraiment !')
            message.reply(embed)
       } else {
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle('Votez !')
                .setDescription('Vous avez deja voté, mais je laisse le lien pour les autres :P\nVoter nous aide à partager le bot, merci à vous !')
                .setThumbnail(client.user.displayAvatarURL())
                .addField('top.gg', 'https://top.gg/bot/752812712165376083/vote', true)
                .setURL('https://top.gg/bot/752812712165376083/vote')
                .setFooter('Merci, vraiment !')
            message.reply(embed)
        }
    })
};

module.exports.help = {
  name: "vote",
  aliases: ["topgg"],
  category: "connections",
  description: "Lien pour voter :P.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}

let AuthUser = function(id) {
    return api.hasVoted(id)
}