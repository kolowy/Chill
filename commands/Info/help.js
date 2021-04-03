const { MessageEmbed } = require("discord.js")
const fs = require("fs");
let categoryList = fs.readdirSync("./commands");
const categoryHelp = require('../../util/categoryHelp.json');
const color = "BLUE";
const ADMIN = process.env.ADMIN.split(',');


module.exports.run = (client, message, args) => {
  let notAccess=true;
    for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id) {
        notAccess=false;
      }
    }
  //NOTE si pas arguments
  if (!args.length) {
    let listCat=[];
    categoryList = categoryList.filter(item => item != "Fondateur");
    if((categoryList.length)==Object.keys(categoryHelp).length ){
      listCat = Object.values(categoryHelp);
    }
    else {
      listCat = categoryList;
    }
      
    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('Liste des commandes')
    let descri = `\nUne liste de toutes les sous-catégories disponibles et leurs commandes\n ⁢⁢⁢⁢Pour plus d\'informations, tapez \`${client.config.PREFIX}help <commande_name>\`\n \n `
    for (var i= 0; i < categoryList.length; i++){
      if(categoryList[i]!="fondateur"){
        descri = descri + ` ${listCat[i]}\n\n`
      }
    }
    embed.setDescription(descri)
    return message.channel.send(embed).then(m => {
      for (var i= 0; i < categoryList.length; i++){
        if(categoryList[i]!="fondateur"){
          m.react(listCat[i].split(' ≫')[0])
        }
      }

      const catego = (reaction, user) => (reaction.emoji.name === '🅰️'||'🔗'||'🎈'||'🖼'||'☎️'||'Ⓜ️'||'🎵'||'🆖') && user.id === message.author.id
      const collectorCat = m.createReactionCollector(catego, { max: 20, time: 1 * 60 * 1000 }); // 1 min
      collectorCat.on('collect', (reaction) => {
        var embed = new MessageEmbed()
          .setTitle("Liste des commandes")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setColor(color)
          .setTimestamp()
          .setThumbnail(client.user.displayAvatarURL())
        for (var i= 0; i < categoryList.length; i++){
          if(listCat[i].split(' ≫')[0] == reaction.emoji.name){
            client.commands.filter(cat => cat.help.category === categoryList[i].toLowerCase()).map(cmd => cmd.help.name).forEach(cmds => {
              const command = client.commands.get(cmds) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(cmds));
              embed.addField(
                `${command.help.name}`,
                `${command.help.description} \n`)
            });

          }
        }
        m.edit(embed)
      });
      collectorCat.on('end', c => m.reactions.removeAll().catch(error => "err"));
    }).catch(err => console.error(err));




  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

    if (!command) return message.reply("Cette commande n'existe pas !")

    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
      .setTitle(`\`${command.help.name}\``)
      .addField("Description", `${command.help.description}`)
      .addField("Utilisation", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name} `, true)
      .addField("Cooldown", `${command.help.cooldown}`, true)
    if (command.help.aliases.length > 0){
      embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
    }
    console.log(command.help.category)
    if((command.help.category == "fondateur")&& (notAccess==false)){
      return message.author.send(embed);
    } else {
      if(command.help.category != "fondateur"){
        return message.channel.send(embed);
      } else {
        return message.channel.send("Commande Fondateur innaccessible pour vous.");
      }
    }
	};
};

module.exports.help = {
  name: "help",
  aliases: ["h"],
  category: "info",
  description: "Renvoit la page d'aide.",
  cooldown: 0,
  usage: "<commande_name>",
  permissions: false,
  args: false,
}