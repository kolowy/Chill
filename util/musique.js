const queue = new Map();
const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { MessageEmbed} = require("discord.js");
const lyricsFinder = require("lyrics-finder");


async function play(guild, song, message) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id)
      return;
    }
    dispatcher = serverQueue.connection.play(await ytdl(song.url), { type: 'opus', filter : 'audioonly' , highWaterMark: 50 }).on('debug', console.log)

      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    var t = song.duration
    var s = Math.floor(t) % 60;
    var m = Math.floor(t / 60) % 60;
    var chaine = m+"m "+s + "s";
    const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle('Play : ' + song.title)
        .setDescription(song.description)
	.setThumbnail(song.thumbail)
        .setURL(song.url)
        .setFooter('Duration : ' + chaine)
    serverQueue.textChannel.send(embed)
};

async function lyric(serverQueue){
	let lyric = " "
	try {
	    lyrics = await lyricsFinder(serverQueue.songs[0].title, "");
	    if (!lyrics) lyrics = "No lyrics found";
	} catch (error) {
	    lyrics = "No lyrics found"
        }
	return lyrics
}

async function playnotyt(guild, song, message) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id)
      return;
    }
    console.log('cc4')
    dispatcher = serverQueue.connection.play(song.url, { highWaterMark: 50 }).on('debug', console.log)
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    console.log('cc simon')

    var t = song.duration
    var s = Math.floor(t) % 60;
    var m = Math.floor(t / 60) % 60;
    var chaine = m+"m "+s + "s";
    const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle('Play : ' + song.title)
        .setDescription(song.description)
	    .setThumbnail(song.thumbail)
        .setURL(song.url)
        .setFooter('Duration : ' + chaine)
    serverQueue.textChannel.send(embed)
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
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle('Next Play : ' + song.title)
                .setDescription(song.description)
                .setThumbnail(song.thumbail)
                .setURL(song.url)
            return message.channel.send(embed).catch(console.error);
        }
    },

    skip: function skip(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
        serverQueue.songs.shift();
        play(message.guild, serverQueue.songs[0]);
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Skipped')
	 return message.channel.send(embed).catch(console.error);
    },
    pause: function pause(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Pause...\n `.resume` pour remettre la musique !").catch(console.error);}
        dispatcher.pause(true)
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Pause...')
            .setDescription('**`.resume`** pour avoir vos musiques de nouveau :P')
	    return message.channel.send(embed).catch(console.error);
    },
    resume: function resume(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
        dispatcher.resume(true)
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('**Resumed !**')
	return message.channel.send(embed).catch(console.error);
    },
    stop: function stop(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
        dispatcher.stop()
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Stop !')
        return message.channel.send(embed).catch(console.error);
    },
    serverQueue: function serverQueue(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Serveur Queue')
            .setDescription(`**Playlist:** 
            ➔ ${serverQueue.songs.map(song => `${song.title}`).join("\n ➔ ")}

             ___________

            **Musique actuelle:** ${serverQueue.songs[0].title}`)
        return message.channel.send(embed).catch(console.error);
    },
    np: function np(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
	var t = serverQueue.songs[0].duration
	var s = Math.floor(t) % 60;
	var m = Math.floor(t / 60) % 60;
	var chaine = m+"m "+s + "s";
        const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle('Play : ' + serverQueue.songs[0].title)
        .setDescription(serverQueue.songs[0].description)
	.setThumbnail(serverQueue.songs[0].thumbail)
        .setURL(serverQueue.songs[0].url)
        .setFooter('Duration : ' + chaine)
        return message.channel.send(embed).catch(console.error);
    },
    volume: function volume(message, args){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
	serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
        const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle('Volume : ' + args[0])
        return message.channel.send(embed).catch(console.error);
    },
    lyrics: function lyrics(message){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue){return message.channel.send("Il n'y a aucune musique en cours !").catch(console.error);}
        lyric(serverQueue).then(lyric => {
		let lyricsEmbed = new MessageEmbed()
		    .setTitle('title:' + serverQueue.songs[0].title)
		    .setDescription(lyric)
		    .setColor("#F8AA2A")
		    .setTimestamp();

		if (lyricsEmbed.description.length >= 2048)
		    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
		return message.channel.send(lyricsEmbed).catch(console.error);
	})
    },
	    radio: function radio(message, song, connection){
        const voiceChannel = message.member.voice.channel;
        const serverQueue = queue.get(message.guild.id);
        if (serverQueue) {dispatcher.stop()}
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
            playnotyt(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
        return 
        }
        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Next Play : ' + song.title)
            .setDescription(song.description)
            .setThumbnail(song.thumbail)
            .setURL(song.url)
        return message.channel.send(embed).catch(console.error);
    },
}
