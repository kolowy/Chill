const { MessageEmbed } = require("discord.js");
const ADMIN = process.env.ADMIN.split(',');

var number = new Map()


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
    let less = 0
    let more = 25

    if (notAccess == false) {
        varNB = 6;
        nb = 0;
        let arr = [];
        let counter = 0;
        client.guilds.cache.forEach((server) => {
            server.channels.cache.find((channel) => channel.type === "text");
            counter++;
            ownerID = server.ownerID
            ownerID = client.users.cache.find(user => user.id === ownerID)
            arr.push(ownerID.username);
        })
        let arrayOwner = [];
        console.log(arr)


        sortedArr = [],
            count = 1;
        sortedArr = arr.sort();
        var embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des owners: (' + counter + "servers)")
            .setTimestamp()

        for (var i = less; i < more; i = i + count) {
            count = 1;
            for (var j = i + 1; j < sortedArr.length; j++) {
                if (sortedArr[i] === sortedArr[j])
                    count++;
            }
            embed.addField(sortedArr[i], count, true)
        }
        
        message.channel.send(embed).then(m => {
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
                var embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Liste des owners: (' + counter + "servers)")
                    .setTimestamp()
                    less = less + 25
                    more = more + 25
                    if(more > sortedArr.length){ more = sortedArr.length }
                    for (var i = less; i < more; i = i + count) {
                        count = 1;
                        for (var j = i + 1; j < sortedArr.length; j++) {
                            if (sortedArr[i] === sortedArr[j])
                                count++;
                        }
                        embed.addField(sortedArr[i], count, true)
                    }
                m.edit(embed);
                m.react('⬅️');
                m.react('⏹');
                if (more != sortedArr.length) {
                    m.react('➡️');
                }
            });
            collectorLess.on('collect', () => {
                m.reactions.removeAll().catch(error => "err");
                var embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Liste des owners: (' + counter + "servers)")
                    .setTimestamp()
                    less = less - 25
                    more = less +25
                    if(less < 0){ less = 0 }
                    for (var i = less; i < more; i = i + count) {
                        count = 1;
                        for (var j = i + 1; j < sortedArr.length; j++) {
                            if (sortedArr[i] === sortedArr[j])
                                count++;
                        }
                        embed.addField(sortedArr[i], count, true)
                    }
                m.edit(embed);
                m.react('⏹');
                m.react('➡️');
                if (less != 0) {
                    m.react('⬅️');
                }
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
    name: "owner",
    aliases: ["owners"],
    category: "fondateur",
    description: "Renvoit la liste des owner des serveurs sur lesquels est le BOT.",
    cooldown: 0,
    usage: "",
    permissions: false,
    args: false,
}