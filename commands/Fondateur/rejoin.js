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
        args = message.content.split(" ").slice(1).join(" ");
        let myGuild = client.guilds.cache.filter((g) => g.name == args).map((c) => c)
        if (myGuild[0]) {
            let chan = myGuild[0].channels.cache.filter((chan) => chan.type == "text").map((go) => go.id)

            theChan = myGuild[0].channels.cache.get(chan[0])
            if (!theChan) {
                message.channel.send("Le salon de l'invitation est introuvable sur le server: " + args);
            } else {
                theChan.createInvite().then(invite => message.author.send("Votre lien d'invitation : \n\nhttps://discord.gg/" + invite.code).catch(() => {
                    message.channel.send("Envoi de la réponse en dm uniquement");
                }));
            }               
        } else {
            message.channel.send("Le server n'existe pas");
        }
    } else {
        const embed = new MessageEmbed()
            .setTitle("Vous n'etes pas fondateurs et donc vous n'avez pas accès à cette commande !")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            .setColor("GREEN");
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "rejoin",
    aliases: ["rejoin", "rej"],
    category: "fondateur",
    description: "Rejoins un serveur",
    cooldown: 0,
    usage: "",
    permissions: false,
    args: false,
}