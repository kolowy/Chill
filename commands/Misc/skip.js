const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { skip } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {
    if (message.member.voice.channel) {
        skip(message)
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
    name: "skip",
    aliases: ["skipe"],
    category: "misc",
    description: "Skip la musique.",
    cooldown: 10,
    usage: "<votre_message>",
    permissions: false,
    args: false,
}
