const { MessageEmbed } = require('discord.js');
const color = "RANDOM";

module.exports.run = (client, message, args, settings) => {

    let pfc = [
        'Pierre',
        'Feuille',
        'Ciseau'
      ]
      let rep = pfc[Math.floor(Math.random() * pfc.length)]
      let embed = new MessageEmbed()
      .setColor('bf25be')
      .setTitle(`Vous voulez jouer ${message.author.username} ?`)
      .setDescription(`C'est parti, cliquez sur une réaction`)
      .setTimestamp()
      message.channel.send(embed).then(async function(t) {
      await t.react('✂️')
      await t.react('📄')
      await t.react('👊')
      const rea = t.createReactionCollector((reaction, user) => user.id === message.author.id)
      rea.on('collect', async function(reaction){
        if(reaction.emoji.name === '✂️'){
            let embed_oui = new MessageEmbed()
            .setColor('1FFF00')
            .setDescription(`Tu as joué : ` + '`Ciseau`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBravo ${message.author.username}, tu as gagné !`)
            .setTimestamp()
            let embed_non = new MessageEmbed()
            .setColor('FF0000')
            .setTimestamp()
            .setDescription(`Tu as joué : ` + '`Ciseau`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\n${message.author.username}, tu as perdu !`)
            let embed_egalite = new MessageEmbed()
            .setColor('black')
            .setDescription(`Tu as joué : ` + '`Ciseau`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBien joué ${message.author.username}, mais c'est une égalité !`)
            .setTimestamp()
          if(rep === 'Pierre'){
          t.edit(embed_non)
          t.reactions.removeAll()
          }
          if(rep === 'Feuille'){
          t.edit(embed_oui)
          t.reactions.removeAll()
          }     
          if(rep === "Ciseau"){
          t.edit(embed_egalite)
          t.reactions.removeAll()
            }
          } else if(reaction.emoji.name === '📄'){
            let embed_oui = new MessageEmbed()
            .setColor('1FFF00')
            .setDescription(`Tu as joué : ` + '`Feuille`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBravo ${message.author.username}, tu as gagné !`)
            .setTimestamp()
            let embed_non = new MessageEmbed()
            .setColor('FF0000')
            .setTimestamp()
            .setDescription(`Tu as joué : ` + '`Feuille`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\n${message.author.username}, tu as perdu !`)
            let embed_egalite = new MessageEmbed()
            .setColor('black')
            .setDescription(`Tu as joué : ` + '`Feuille`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBien joué ${message.author.username}, mais c'est une égalité !`)
            .setTimestamp()
          if(rep === 'Pierre'){
          t.edit(embed_oui)
          t.reactions.removeAll()
            }
          if(rep === 'Feuille'){
            t.edit(embed_egalite)
            t.reactions.removeAll()
            }
          if(rep === 'Ciseau'){
            t.edit(embed_non)
            t.reactions.removeAll()
          }
         }
         if(reaction.emoji.name === '👊'){
            let embed_oui = new MessageEmbed()
            .setColor('1FFF00')
            .setDescription(`Tu as joué : ` + '`Pierre`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBravo ${message.author.username}, tu as gagné !`)
            .setTimestamp()
            let embed_non = new MessageEmbed()
            .setColor('FF0000')
            .setTimestamp()
            .setDescription(`Tu as joué : ` + '`Pierre`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\n${message.author.username}, tu as perdu !`)
            let embed_egalite = new MessageEmbed()
            .setColor('black')
            .setDescription(`Tu as joué : ` + '`Pierre`' + `\nJ'ai joué : ` + '`' + rep + '`' + `\nBien joué ${message.author.username}, mais c'est une égalité !`)
            .setTimestamp()
           if(rep === 'Ciseau'){
             t.edit(embed_oui)
             t.reactions.removeAll()
           }
           if(rep === 'Feuille'){
             t.edit(embed_non)
             t.reactions.removeAll()
           }
           if(rep === 'Pierre'){
             t.edit(embed_egalite)
             t.reactions.removeAll()
           }
         }
        })

      })   
    }

module.exports.help = {
    name: "pfc",
    aliases: ["pfc"],
    category: "funny",
    description: "Défie le maître a pierre/feuille/ciseaux.",
    cooldown: 0,
    usage: "",
    permissions: false,
    args: false,
}