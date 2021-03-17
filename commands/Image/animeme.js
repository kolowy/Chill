const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const color = "PURPLE";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async (client, message, args) => {
	message.delete({ timeout: 1000 });

	const anime = await fetch("https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500")
    .then(res => res.json())
    .then(json => json.data.children);
	const img = anime[getRandomInt(anime.length)].data;
  
  const embed = new MessageEmbed()
		.setColor(color)
    .setDescription(img.title)
    .setImage(img.url)
    .setTimestamp()
    .setFooter("Extract to r/animemes");
  message.channel.send(embed);
};

module.exports.help = {
  name: "animeme",
  aliases: ["meme"],
  category: "image",
  description: "Renvoit un mème.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}