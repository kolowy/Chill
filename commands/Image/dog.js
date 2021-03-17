const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const color = "PURPLE";

module.exports.run = async (client, message, args) => {
  message.delete({ timeout: 1000 });

  const dog = await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(json => json.message);

	const embed = new MessageEmbed()
		.setColor(color)
		.setImage(dog)
		.setTimestamp()
		.setFooter("Extract to https://dog.ceo/api/breeds/image/random");
  message.channel.send(embed);
};

module.exports.help = {
  name: "dog",
  aliases: ["chien"],
  category: "image",
  description: "Renvoit une image de chien.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}