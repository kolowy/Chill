const { MessageEmbed } = require('discord.js');
const color = "RANDOM";

module.exports.run = (client, message, args, settings) => {

    let pf = [
        'Pile',
        'Face'
      ]
      let r = pf[Math.floor(Math.random() * pf.length)]
      let emj = message.guild.emojis.cache.find(r => r.name === 'loading')
      let attente = new MessageEmbed()
      .setColor('black')
      .setTimestamp()
      .setDescription('Je lance la pièce ! ' + `${emj}`)

      let embed = new MessageEmbed()
      .setColor('black')
      .setTimestamp()
      .setTitle(`Un pile ou face ${message.author.username} ?!`)
      .setDescription('**C\'est parti !** \n\n • __Pile__ :   :regional_indicator_p:\n • __Face__ : :regional_indicator_f:')
      message.channel.send(embed).then(async function(f) {
        await f.react('🇵')
        await f.react('🇫')
        const re = f.createReactionCollector((reactions, user) => user.id === message.author.id)
        re.on('collect', async function(reaction){
          if(reaction.emoji.name === '🇵'){
              let embed_oui = new MessageEmbed()
              .setColor('1FFF00')
              .setDescription(`Tu as choisi : ` + '`' + 'Pile' + '`' + `\nLa pièce est tombée sur : ` + '`' + r + '`' + `\n\n• Bravo ${message.author.username}, tu as gagné !`)
              .setTimestamp()
              let embed_non = new MessageEmbed()
              .setColor('FF0000')
              .setTimestamp()
              .setDescription(`Tu as choisi : ` + '`' + 'Pile' + '`' + `\nLa pièce est tombée sur : ` + '`' + r + '`' + `\n\n• ${message.author.username}, tu as perdu !`)
            f.edit(attente)
            setTimeout(() => {
            if(r === 'Pile'){
              f.edit(embed_oui)
              f.reactions.removeAll()
            }
            if(r === 'Face'){
              f.edit(embed_non)
              f.reactions.removeAll()
            }
          }, 3500);
          } else if(reaction.emoji.name === '🇫'){
              let embed_oui = new MessageEmbed()
              .setColor('1FFF00')
              .setDescription(`Tu as choisi : ` + '`' + 'Face' + '`' + `\nLa pièce est tombée sur : ` + '`' + r + '`' + `\n\n• Bravo ${message.author.username}, tu as gagné !`)
              .setTimestamp()
              let embed_non = new MessageEmbed()
              .setColor('FF0000')
              .setTimestamp()
              .setDescription(`Tu as choisi : ` + '`' + 'Face' + '`' + `\nLa pièce est tombée sur : ` + '`' + r + '`' + `\n\n• ${message.author.username}, tu as perdu !`)
            setTimeout(() => {
              f.edit(attente)
            if(r === 'Face'){
              f.edit(embed_oui)
              f.reactions.removeAll()
            }
            if(r === 'Pile'){
              f.edit(embed_non)
              f.reactions.removeAll()
            }
           }, 3500);
          }

        })
        
      })
}

module.exports.help = {
    name: "pf",
    aliases: ["pf"],
    category: "funny",
    description: "Défie le maître à pile ou face.",
    cooldown: 0,
    usage: "",
    permissions: false,
    args: false,
}