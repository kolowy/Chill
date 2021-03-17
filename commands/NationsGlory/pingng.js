const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const request  = require('request');
const color = "RED";

module.exports.run = (client, message, args) => {
  message.delete({ timeout: 1000 });

  request('https://apiv2.nationsglory.fr/launcher/get_players', function (error, response, body) {
    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle("Pong ! <:NG:810505030981255218>") 
     .setDescription(`**${body}** joueurs connectés !`) 
     .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");
    message.channel.send(embed)
  });
}

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.PINGNG;