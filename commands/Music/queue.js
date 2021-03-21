const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { serverQueue } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {
    serverQueue(message)
    return;
};


module.exports.help = {
    name: "queue",
    aliases: ["serveurqueue", "queu", "servqueue"],
    category: "music",
    description: "Voir toutes les musiques.",
    cooldown: 10,
    usage: "",
    permissions: false,
    args: false,
}
