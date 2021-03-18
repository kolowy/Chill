const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const color = "PINK"

module.exports.run = async (bot, message, args) => {

  const name = args.join(" ");

  if (!name) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("__Erreur__", message.guild.iconURL)
      .setDescription(" ")
      .addField("Raison:", "Veuillez préciser le paramètre\n[user] s'il vous plaît !")
      .setFooter("Page d'info", "https://images.emojiterra.com/google/android-11/128px/2139.png")
      .setTimestamp();
    message.channel.send(embed);
    return
  }

  const url = `https://www.instagram.com/${name}/?__a=1`;

  try {
    res = await fetch(url).then(url => url.json());

  } catch (e) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("__Erreur__", message.guild.iconURL)
      .setDescription(" ")
      .addField("Raison:", "Je ne peux pas trouver cet utilisateur...\nCar il n'existe pas !")
    .setFooter("Page d'info", "https://images.emojiterra.com/google/android-11/128px/2139.png")
    .setTimestamp();

    message.channel.send(embed);
    return
  }
  const account = res.graphql.user;

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(account.full_name)
    .setURL(`https://instagram.com/${name}`)
    .setThumbnail(account.profile_pic_url_hd)
    .addField("Profile information", stripIndents`**- Username :** ${account.username}
        - Full name: ${account.full_name}
	- Private account: ${account.is_private ? "Yes 🔐" : "Nope 🔓"}
        - Biography: ${account.biography.length == 0 ? "none" : account.biography}
        - Posts: ${account.edge_owner_to_timeline_media.count}
        - Followers: ${account.edge_followed_by.count}
        - Following: ${account.edge_follow.count}`)
    .setFooter("Insta", "https://images.emojiterra.com/google/android-11/128px/1f517.png")
    .setTimestamp();

  message.channel.send(embed);  
};

module.exports.help = {
  name: "insta",
  aliases: ["instagram"],
  category: "connections",
  description: "Renvoit un compte insta.",
  cooldown: 10,
  usage: "<pseudo>",
  permissions: false,
  args: true,
}
