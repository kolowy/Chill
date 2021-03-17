const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

  message.delete({ timeout: 1000 });
  // c'est de la merde ++ by XDemon, naab Kolowy
  var argument = ``
  var x = args.length
  for(let i = 0; i < x; i++) {
    argument = `${argument} ${args[i]} `
  }

  const suggestion = new MessageEmbed()
   .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
  .setTitle(`:bulb: ${message.author.username}'S SUGGESTION`)
  .setDescription(`${argument}`)  
  .setColor("GREEN")
  .setFooter("By Kolowy • Cobra ", 'https://skins.nationsglory.fr/face/Kolowy/3d/15')
  .setTimestamp();
  message.channel.send(suggestion).then(function (message) {
        message.react("✅")
        message.react("➖")
        message.react("❌")
  });
};

module.exports.help = {
  name: "sugg",
  aliases: ["idea"],
  category: "info",
  description: "Propose une suggestion.",
  cooldown: 10,
  usage: "<suggestion>",
  permissions: false,
  args: true,
}