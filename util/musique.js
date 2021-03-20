const queue = new Map();
const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');


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

module.exports = {
    Queue: function Queue(message, song, connection) {
        const voiceChannel = message.member.voice.channel;
        const serverQueue = queue.get(message.guild.id);
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
    },

    skip: function skip(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !")}
        serverQueue.songs.shift();
        play(message.guild, serverQueue.songs[0]);
    }
}
