//XDemon
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js')
const color = "DARK"

module.exports.run = async (client, message, args) => {

  message.delete({ timeout: 1000 });

  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  if(!client.commands.has(commandName)) {
    return message.reply("Cette commande n'existe pas !");
  }
  delete require.cache[require.resolve(`../${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle('__Commande redémarrée__')
    .setDescription(`La commande ${commandName} a été redémarrée !`)
    .setFooter("Page d'info", "https://images.emojiterra.com/google/android-11/128px/2139.png")
    .setTimestamp();

  guild.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);
};  

module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOADCOMMAND;