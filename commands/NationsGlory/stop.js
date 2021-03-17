const { MessageEmbed } = require('discord.js');
const { ytdl } = require('ytdl-core');


module.exports.run = async (client, message, args) => {


  if (message.member.voice.channel) {
    try {
    message.member.voice.channel.leave();
    } catch { 
      message.reply(':x: Error :x:').then(msg => { 
      msg.delete({ timeout: 15000 })})
      return; 
    }
  } else {
    message.channel.send("Vous n'etes pas dand un channel vocal ...").then(msg => { 
      msg.delete({ timeout: 7000 })})
    return
  }
 
 const radio = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle('Merci de votre écoute ! 🔘')
    .setColor("#0474dc")
    .setDescription("Vous avez arrêté la radio de NationsGlory !")
    .setFooter("Extract to NG Radio © ", 'https://static.nationsglory.fr/N24y2366y4.png')

  message.channel.send(radio)
};

module.exports.help = {
  name: "stop",
  aliases: ["ngstop"],
  category: "nationsglory",
  description: "Stoppe NG-Radio.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}