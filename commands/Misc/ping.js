//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const color = "RANDOM";

module.exports.run = async (client, message, args) => {

  message.delete({ timeout: 1000 });

   const msg = await message.channel.send("Ping !");

   msg.edit(new MessageEmbed()
      .setColor(color)
      .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
      .setTitle("Ping ! 🏓", message.guild.iconURL)
      .setDescription(`Latence du message : \`${msg.createdTimestamp - message.createdTimestamp}ms\`\nLatence du BOT : \`${Math.round(client.ws.ping)}ms\``)
    );
};

module.exports.help = MESSAGES.COMMANDS.MISC.PING;