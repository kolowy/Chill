const { MessageEmbed } = require('discord.js');
const { ytdl } = require('ytdl-core');
const { stop } = require("../../util/musique.js");


module.exports.run = async (client, message, args) => {


  if (message.member.voice.channel) {
    stop(message)
    return;

  } else {
    message.channel.send("Vous n'etes pas dand un channel vocal ...").then(msg => { 
      msg.delete({ timeout: 7000 })})
    return
  }
}

module.exports.help = {
  name: "stop",
  aliases: ["stope"],
  category: "music",
  description: "Stoppe la musique.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}
