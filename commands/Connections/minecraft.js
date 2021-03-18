const { MessageEmbed} = require("discord.js");
const request = require('request');
const mcPort = 25565;
const color = "YELLOW"

module.exports.run = async (client, message, args) => {
  ip = args[0]

  if (args.length > 1) {
    mcPort = args[1]
  }
  var url = 'http://mcapi.us/server/status?ip=' + ip + '&port=' + mcPort;
  request(url, function (err, response, body) {
    if (err) {
      const reportEmbed = new MessageEmbed()
        .setTitle("Error", message.guild.iconURL)
        .setDescription(" ")
        .setColor(color)
        .addField("Reason:", "Le serveur n'existe pas")
        .setTimestamp()
      return message.channel.send(reportEmbed);
    }
    body = JSON.parse(body);
    if(body.online == false){
      const errorEmbed = new MessageEmbed()
        .setTitle("Error", message.guild.iconURL)
        .setDescription(" ")
        .setColor(color)
        .addField("Reason:", `Le serveur **${ip}** n'existe pas, reverifiez votre ip..."`)
        .setFooter("Minecraft",  "https://images.emojiterra.com/google/android-11/128px/1f50c.png")
        .setTimestamp()
      return message.channel.send(errorEmbed);
    } else {
      if (body.online) {
        const errorEmbed = new MessageEmbed()
          .setTitle("Error", message.guild.iconURL)
          .setDescription(`Le serveur : **${ip}** est actuallement **online**.
          Le nombre de personnes connecté est de : **${body.players.now}**`)
          .setColor("GREEN")
          .setFooter("Minecraft",  "https://images.emojiterra.com/google/android-11/128px/1f50c.png")
          .setTimestamp();
        return message.channel.send(errorEmbed);
      } else {
        const errorEmbed = new MessageEmbed()
          .setTitle("Error", message.guild.iconURL)
          .setDescription(`Le serveur : **${ip}** est actuallement **offline**.`)
          .setColor(color)
          .setFooter("Minecraft",  "https://images.emojiterra.com/google/android-11/128px/1f50c.png")
          .setTimestamp();
        return message.channel.send(errorEmbed);
      }
    }
  });
}

module.exports.help = {
  name: "mc",
  aliases: ["minecraft"],
  category: "connections",
  description: "Permet de savoir si un serveur est connecté.",
  cooldown: 10,
  usage: "<ip> <port>",
  permissions: false,
  args: true,
}
