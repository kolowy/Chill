const { MessageEmbed, GuildAuditLogsEntry} = require("discord.js");
const emoji = require('../../util/emoji');
const Playboard = require('../../util/Playboard');
const Controller = require('../../util/Controller');
const Topgg = require(`@top-gg/sdk`)

const api = new Topgg.Api(process.env.TOPGG)

module.exports.run = (client, message) => {
    let userToken = AuthUser(message.author.id)    
    userToken.then(function(result) {
        if(result != true){
            const embed = new MessageEmbed()

            .setColor("#FF0000")
            .setTitle('Puissance 4')
            .setDescription('Cette commande n\'est accessible que si vous votez \n Merci à vous !')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('top.gg', 'https://top.gg/bot/752812712165376083/vote', true)
            .setURL('https://top.gg/bot/752812712165376083/vote')
            return message.reply(embed)
        } else {
            const mentionned = message.mentions.users.first();
            let pl2 = ""
            if (mentionned) {
                const pl2 = message.mentions.users.first();
                var pl1 = message.author
            } else {
              return message.reply("veuillez mentionner quelqu'un, l'IA n'est pas encore dev")
            }
            const embed = new MessageEmbed()
                .setTitle(`Puissance 4`)
                .setColor("BLUE")
                .setDescription(pl2 + "réagissez s'il vous plait sous ce message pour commencer la partie" )
            message.channel.send(embed).then(m => {
                m.react('👍');
        
                const Yes = (reaction, user) => reaction.emoji.name === '👍' && user.id === message.mentions.users.first().id;
                const collectYes = m.createReactionCollector(Yes, { max: 20, time: 1 * 60 * 1000 }); // 1 min
                collectYes.on('collect', () => {
                    m.reactions.removeAll().catch(error => "err");
                    collectYes.stop()
                    m.delete({ timeout: 1000 }).catch((error) => {
                        message.channel.send('I cannot delete message here')
                    });
                    const user = {
                        pl1: message.author,
                        pl2: message.mentions.users.first()
                    };
                    starting(client, message, user)
                });
            })
        }
    })
};

module.exports.help = {
  name: "p4",
  aliases: ["puissance4"],
  category: "connections",
  description: "Jouer au puissance 4 !",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}

async function starting(client, message, user){
    const rouge = client.emojis.cache.find(emoji => emoji.name === "p4rouge");
    const jaune = client.emojis.cache.find(emoji => emoji.name === "p4jaune");
    const blanc = client.emojis.cache.find(emoji => emoji.name === "p4vide");
    const emoji = {
        1: "1️⃣",2: "2️⃣",3: "3️⃣",4: "4️⃣",5: "5️⃣",6: "6️⃣",7: "7️⃣",
        all: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"],
        circle: {
            red: rouge,
            yellow: jaune,
            white: blanc,
        }
    };
    let out = true;
    const controller = new Controller(client, emoji, out);
    const partie = new Playboard(emoji, user);

    var actualPlayer =0
    const embed = new MessageEmbed()
    .setTitle(`Puissance 4`)
    .setColor("BLUE")
    .setDescription(`${client.emojis.cache.find(emoji => emoji.name === 'loadingBar')}`)
    let msg = await message.channel.send(embed);
    await msg.react(emoji[1]);
    await msg.react(emoji[2]);
    await msg.react(emoji[3]);
    await msg.react(emoji[4]);
    await msg.react(emoji[5]);
    await msg.react(emoji[6]);
    await msg.react(emoji[7]);
    let i = -1
    while (out == true) {
        i++
        await controller.draw(message, msg, partie, emoji, controller);
        if(controller.win() == false){out = false; controller.playerwin(msg, partie, emoji, message)}
    }
}

let AuthUser = function(id) {
    return api.hasVoted(id)
}