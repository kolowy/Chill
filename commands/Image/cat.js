const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const color = "PURPLE";

module.exports.run = async (client, message, args) => {
  message.delete({ timeout: 1000 });

  const cat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);

	const embed = new MessageEmbed()
		.setColor(color)
		.setImage(cat)
		.setTimestamp()
		.setFooter("Extract to http://aws.random.cat/meow");
  message.channel.send(embed);
};

module.exports.help = {
  name: "cat",
  aliases: ["chat"],
  category: "image",
  description: "Renvoit une image de chat.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}