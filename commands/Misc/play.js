const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { Queue } = require("../../util/musique.js");


module.exports.run = async(client, message, args) => {        
    execute(message);
    return;
};


async function execute(message) {
    args = message.content.substring(message.content.indexOf(" ") + 1, message.content.length)
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("Vous n'etes pas dans un channel vocal");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "Je n'ai pas les permissions necessaires pour parler ou pour me connecter"
      );
    }
    apikey = process.env.YOUTUBE
    url = "https://youtube.googleapis.com/youtube/v3/search?maxResults=5&q=" + args + "&key=" + apikey;
    var connection = await voiceChannel.join();

    youtube(url, { json: true }, (err, body, res) => {
        if (err) { return console.log(err); }
        n = 0
        while(res.items[n].id.videoId ==  undefined){
            n=n+1
            console.log(n)
        }
        kolo = res.items[n].id.videoId;
        const song = {
            url: 'https://www.youtube.com/watch?v=' + kolo,
        };
        Queue(message, song, connection)
    });
}

module.exports.help = {
    name: "play",
    aliases: ["p", "pl"],
    category: "Misc",
    description: "Permet de jouer de la musique.",
    cooldown: 10,
    usage: "<titre>",
    permissions: false,
    args: true,
}
