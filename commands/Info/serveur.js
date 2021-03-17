require('dotenv').config() // Protect the token.
const { MessageEmbed } = require('discord.js'); // DiscordJS.
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  
//add :small_blue_diamond: Voice/Text Channels: 9 / 16

  let authorGuild = message.channel.guild.name !== null ? message.channel.guild.name : '';
  let nameGuild = message.guild.name;
  let idGuild = message.guild.id;
  let ownerGuild = message.guild.owner.user
  let membersGuild = message.guild.memberCount;
  let botsNbGuild = message.guild.members.cache.filter(member => member.user.bot).size;
  let channelsGuild = message.guild.channels.cache.size;
  let rolesNbGuild = message.guild.roles.cache.size;
  let regionGuild = message.channel.guild.region;
  let creationGuild = moment(message.guild.createdAt).format("DD/MM/YYYY hh:mm");
  let botJoinGuild = moment(message.guild.me.joinedAt).format("DD/MM/YYYY hh:mm");
  let verifGuild = message.channel.guild.verificationLevel;
  let afkTimer = message.channel.guild.afkTimeout / 60;

    let online =message.guild.members.cache.filter(m => m.presence.status == 'online'&& m.user.bot==false).map(o => o.user.username).length;
    let offline = message.guild.members.cache.filter(m => m.presence.status == 'offline'&& m.user.bot==false).map(o => o.user.username).length;
  
  let rolesGuild = message.channel.guild.roles.cache.map(c => c.name).join(' , ');
  let botsGuild =   message.guild.members.cache.filter(member => member.user.bot).map(b => b.user.username).join(' , ');
  message.channel.createInvite()

    .then(invite => {
      const embed = new MessageEmbed()
        .setAuthor("Informations about: " + authorGuild)
        .addField("Name:", nameGuild, true)
        .addField("ID:", idGuild, true)
        .addField("Owner:", ownerGuild, true)
        .addField("Members:", membersGuild, true)
        .addField("Numbers of Bots:", botsNbGuild, true)
        .addField("Channels:", channelsGuild, true)
        .addField("Number of roles:", rolesNbGuild, true)
        .addField("Server localization:", regionGuild, true)
        .addField("Creation date:", creationGuild, true)
        .addField("Bot join:", botJoinGuild, true)
        .addField("Verificatin level:", verifGuild, true)
        .addField("Time before AFK:", afkTimer, true)
        .addField("Link:", "https://discord.gg/" + invite.code, true)
        .addField("Users Offline/Online: ", offline+"/"+online)
        .addField("Roles:", rolesGuild)
        .addField("Bots:", botsGuild)
        .setColor("GREEN")
        .setFooter("By XDemon • Chill ")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL());

      message.channel.send(embed)
    })
}

module.exports.help = {
  name: "server",
  aliases: ["servinfo"],
  category: "info",
  description: "Renvoit des infos sur le serveur.",
  cooldown: 10,
  usage: "<country_name>",
  permissions: false,
  args: false,
}