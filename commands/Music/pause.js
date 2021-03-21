const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { pause } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {
    if (message.member.voice.channel) {
        pause(message)
        message.channel.send('skip !')
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
    name: "pause",
    aliases: ["pause"],
    category: "music",
    description: "Met la musique en pause.",
    cooldown: 10,
    usage: "<votre_message>",
    permissions: false,
    args: false,
}
