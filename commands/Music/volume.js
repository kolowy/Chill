const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { volume } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {
	if (isNaN(args[0]) || Number(args[0]) > 100 || Number(args[0]) < 1){return message.channel.send("Merci de mettre un nombre entre 1 et 100")}
    volume(message, args)
    return;
};


module.exports.help = {
    name: "volume",
    aliases: ["vol"],
    category: "music",
    description: "Volume de la musiques.",
    cooldown: 10,
    usage: "<volume>",
    permissions: false,
    args: true,
}
