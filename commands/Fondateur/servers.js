const { MessageEmbed } = require("discord.js");
const ADMIN = process.env.ADMIN.split(',');


function listeServers(servs, nb) {
    liste = "";
    servs.sort();
    for (var i = nb; i < nb + varNB; i++) {
        if (servs[i]) {
            liste += "● " + servs[i] + "\n";
        }
    }
    return liste;
}
module.exports.run = async(client, message, args) => {
    let notAccess = true;
    for (let i = 0; i < ADMIN.length; i++) {
        if (ADMIN[i] == message.author.id) {
            notAccess = false;
        }
    }

    if (notAccess == false) {
        varNB = 6;;
        nb = 0;
        let lstServer = [];
        let count = 0;
        client.guilds.cache.forEach((server) => {
            const chan = server.channels.cache.find(
                (channel) => channel.type === "text"
            );
            count++;
            lstServer.push(server.name);
        })

        var embed = new MessageEmbed()
            .setTitle("le bot est sur " + count + " servers")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            .setColor("GREEN")
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(listeServers(lstServer, nb))
        message.channel.send(embed)
            .then(m => {
                m.react('⏹');
                m.react('➡️');

                const filterMore = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
                const filterLess = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
                const filterStop = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
                const collectorLess = m.createReactionCollector(filterLess, { max: 20, time: 1 * 60 * 1000 }); // 1 min
                const collectorMore = m.createReactionCollector(filterMore, { max: 20, time: 1 * 60 * 1000 }); // 1 min
                const collectorStop = m.createReactionCollector(filterStop, { max: 20, time: 1 * 60 * 1000 }); // 1 min
                collectorStop.on('collect', () => {
                    m.reactions.removeAll().catch(error => "err");
                    collectorLess.stop();
                    collectorMore.stop();

                });
                collectorMore.on('collect', () => {
                    m.reactions.removeAll().catch(error => "err");
                    nb = nb + varNB;

                    liste = listeServers(lstServer, nb)

                    var embed = new MessageEmbed()
                        .setTitle("le bot est sur " + count + " servers")
                        .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
                        .setColor("GREEN")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setDescription(liste);
                    m.edit(embed);
                    m.react('⬅️');
                    m.react('⏹');
                    if (nb + varNB < count) {
                        m.react('➡️');
                    }
                });
                collectorLess.on('collect', () => {
                    m.reactions.removeAll().catch(error => "err");
                    nb = nb - varNB;

                    liste = listeServers(lstServer, nb)

                    var embed = new MessageEmbed()
                        .setTitle("le bot est sur " + count + " servers")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor("GREEN")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setDescription(liste);
                    m.edit(embed);
                    if (nb != 0) {
                        m.react('⬅️');
                    }
                    m.react('⏹');
                    m.react('➡️');
                });
                collectorLess.on('end', c => m.reactions.removeAll().catch(error => "err"));
                collectorMore.on('end', c => m.reactions.removeAll().catch(error => "err"));
            }).catch(err => console.error(err));
    } else {
        const embed = new MessageEmbed()
            .setTitle("Vous n'etes pas fondateurs et donc vous n'avez pas accès à cette commande !")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            .setColor("GREEN");
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "servers",
    aliases: ["servers"],
    category: "fondateur",
    description: "Renvoit la liste des serveurs sur lesquels est le BOT.",
    cooldown: 0,
    usage: "",
    permissions: false,
    args: false,
}