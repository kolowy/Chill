const { MessageEmbed, version } = require('discord.js'); 
const  moment  = require("moment");
const categoryHelp = require('../../util/categoryHelp.json');

function strUpperFirst(region){return (region+'').charAt(0).toUpperCase()+region.substr(1);}

module.exports.run = async (client, message, args) => {
  let countServer=0;
  client.guilds.cache.forEach(() => {
    countServer++;
  });

  let nbUsers = client.users.cache.filter(b => b.bot != true).size
  client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
  let guild = message.guild;

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
  	.setTitle(`Informations a propos du Serveur : ${guild.name}`, message.guild.iconURL)
   	.setColor("GREEN")
   	.addField("Prefix", client.presence.status, true)
    .addField("Status", client.config.PREFIX,true)

   	.addField("Region", strUpperFirst(guild.region), true)
   	.addField("Verfié", client.user.verified, true)
  	.addField("Servers: ", countServer, true)
  	.addField("Channels: ", `${client.channels.cache.size}`, true)
  	.addField("Utilisateurs : ", nbUsers, true)
  	.addField("Latence d'API: ", `${Math.round(client.ws.ping)}`+ `ms`, true)
 	  .addField("Memoire: ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  	.addField("Discord js: ", `${version}`, true)
  	.addField("Nombre de commandes ", client.commands.size, true)
  	.addField("Catégorie: ",Object.values(categoryHelp))
  	.setFooter("Créer le: "+ moment(client.user.createdAt).format("DD/MM/YYYY hh:mm"))
  	.setThumbnail(client.user.displayAvatarURL())
   	.setTimestamp();
  message.channel.send(embed)    
}

module.exports.help = {
	name: "bot",
	aliases: ["botinfo"],
	category: "info",
	description: "Renvoit des infos sur le BOT.",
	cooldown: 10,
	usage: "",
	permissions: false,
	args: false,
}
