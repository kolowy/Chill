const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const queue = new Map();
const youtube = require('request');

module.exports.run = async(client, message, args) => {        
    const serverQueue = queue.get(message.guild.id);
    execute(message, serverQueue);
    return;
};


async function execute(message, serverQueue) {
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
    apikey = "AIzaSyDRj96JsNyvLdlqrXgqbn6E92L6-PoXiHQ"
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
        if (!serverQueue) {
            const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);

        try {
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
        } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return 
        }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`**${song.url}** is playing`);
        }
    });
    
    async function play(guild, song, message) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id)
          return;
        }
        const dispatcher = serverQueue.connection.play(await ytdl(song.url), { type: 'opus', filter : 'audioonly' , highWaterMark: 50 }).on('debug', console.log)

          .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));

        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Play: **${song.url}**`);
    };
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
