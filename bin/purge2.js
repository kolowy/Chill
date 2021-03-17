//Croux + XDemon
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
 
  if (!message.member.hasPermission("MANAGE_ROLES") && access==false) return message.reply("**Vous devez avoir la permission** `ADMINISTRATOR` **pour exécuter cette commande !**");

//switch purge args gloabl
  switch(args.length){
    case 0 :
      message.reply("**Merci de mettre des arguments avec cette commande** :)")
      break;
    case 1:
        message.channel.bulkDelete(args[0]);
        message.reply("Cobra supprime :"+args[0]+" messages");
      break;
    case 2:
          //switch purge 2 args
          if(args[0]=="link"){
              console.log("Je suprrime "+args[1]+ " liens");
          } else if(args[0]=="image"){
              console.log("Je supprime "+args[1]+ " images");
          } else if(args[0]=="embeds"){
              console.log("Je supprime "+ args[1]+ " embeds");
          } else if(args[0]== "humans"){
              console.log("Je supprime "+ args [1]+ " messages de humans");
          } else if(args[0]=="bots"){
              console.log("Je supprime "+ args[1]+ " messages de bots");
          } else {
              let mentionned = message.mentions.users.first();

                if (isNaN(args[0]) || parseInt(args[0]) <= 0|| parseInt(args[0]) >= 100) { return message.reply("Veuillez ne mettre qu'un nombre entre 0 et 100 "+"<:troll:760227280319807529>") }

              console.log("Je supprime "+args[0]+ " messages de: " +mentionned);

              message.channel.messages.fetch({
                limit: 100
            }).then((messages) => {
            if (user) {
            const filterBy = user ? user.id : Client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }
            message.channel.bulkDelete(messages)
          })};
          mentionned.username
          break;
    case 3:
          console.log("3args");
      break;
    default:
      message.reply("**Vos arguments fournis sont erronés** :(")
  }

/* Merci de l'avoir laissé
  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply('Il faut spécifier un **nombre** entre \`1\` et \`100\` !');




  const messages = await message.channel.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  })

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
	  .setColor("PINK")
	  .setAuthor(message.author.username, message.author.avatarURL())
	  .setDescription(`**Action** : PURGE\**Nbr de messages** : ${args[0]}\**Salon** : ${message.channel}`)
	  //.setThumbnail(imageclear)

  client.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);

      message.delete()
*/
};
module.exports.help = MESSAGES.COMMANDS.MODERATION.PURGE;