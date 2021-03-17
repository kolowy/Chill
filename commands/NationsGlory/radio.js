const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js')
const color = "5AAAF6";

module.exports.run = (client, message, args) => {

  if (message.member.voice.channel) {
    try {
      const voiceChannel = message.member.voice.channel
      voiceChannel.join().then(connection => {
        connection.play('https://radio.nationsglory.fr:8000/ngradio', { volume: 0.25});
                return;
      });

    } catch {
      message.reply(':x: Error :x:').then(msg => { 
      msg.delete({ timeout: 15000 })})
      return;
    }
  } else {
     client.channels.cache.get(client.config.cmdChannel).send(`${message.author} - Tu dois être dans le salon vocal '**🎧】Ecoute de la Radio**' pour lancer la radio !`).then(msg => { 
      msg.delete({ timeout: 7000 })})
      return
  };
    
 const radio = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle('Bonne écoute ! 📻')
    .setColor("#0474dc")
    .setDescription("Vous avez lancé la radio de NationsGlory !")
    .setFooter("Extract to NG Radio © ", 'https://static.nationsglory.fr/N24y2366y4.png')

  message.channel.send(radio)
};

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.RADIO;
