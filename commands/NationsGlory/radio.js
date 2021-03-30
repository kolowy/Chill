const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();
const youtube = require('request');
const { radio } = require("../../util/musique.js");

module.exports.run = (client, message, args) => {
  execute(message);
  return;
};

async function execute(message) {
  //NOTE perms
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send("Vous n'etes pas dans un channel vocal");
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Je n'ai pas les permissions necessaires pour parler ou pour me connecter"
    );
  }
  var connection = await voiceChannel.join();

  const song = {
      url: 'https://radio.nationsglory.fr:8000/ngradio',
      title: 'Radio NG',
      description: 'ng radio',
      duration: 00
  };
  radio(message, song, connection)
}


module.exports.help = {
  name: "radio",
  aliases: ["ngradio"],
  category: "nationsglory",
  description: "Lance NG-Radio..",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}
