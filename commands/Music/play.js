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
    //NOTE perms
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
        console.log(res)
        while(res.items[n].id.videoId ==  undefined){
            n=n+1
            console.log(n)
        }
        //NOTE video trouvé -> play + description
        kolo = res.items[n].id.videoId;
        getytdl('https://www.youtube.com/watch?v=' + kolo).then(s => {
            const song = {
                url: 'https://www.youtube.com/watch?v=' + kolo,
                title: s.videoDetails.title,
                description: s.videoDetails.description,
                duration: s.videoDetails.lengthSeconds
            };
            Queue(message, song, connection)
        })
    });
}
async function getytdl(url){
    //NOTE avoir les infos sur la vidéo
    var getinfo = await ytdl.getBasicInfo(url);
    return(getinfo)
}

module.exports.help = {
    name: "play",
    aliases: ["p", "pl"],
    category: "music",
    description: "Permet de jouer de la musique.",
    cooldown: 10,
    usage: "<titre>",
    permissions: false,
    args: true,
}
