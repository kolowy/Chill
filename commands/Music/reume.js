const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { resume } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {
    if (message.member.voice.channel) {
        resume(message)
        return;
    } else {
        message.channel.send("Vous n'etes pas dand un channel vocal ...").then(msg => { 
            msg.delete({ timeout: 7000 })}).catch((error) => {
                message.channel.send('I cannot delete message here')
            });
        return
    }
};


module.exports.help = {
    name: "resume",
    aliases: ["resum"],
    category: "music",
    description: "Remet la musique en route.",
    cooldown: 10,
    usage: "<votre_message>",
    permissions: false,
    args: false,
}
