//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const color = "RANDOM";
let nameEmojis=[];
let iconEmojis=[];

module.exports.run = async (client, message, args) => {

  const embed = new MessageEmbed()
		.setColor(color)
    
 /*client.guilds.cache.forEach((server) => {
   embed.setDescription(`Voici les émojis du server: ` +server.name)
      server.emojis.cache.map(emoji => embed.addField(emoji.name));
      server.emojis.cache.map(emoji => iconEmojis.push(emoji.toString()));
  message.channel.send(embed)

    })*/

      client.emojis.cache.map(emoji => nameEmojis.push(emoji.name));


      client.emojis.cache.map(emoji => nameEmojis.push(emoji.name));
      client.emojis.cache.map(emoji => iconEmojis.push(emoji.toString()));
      /*
      for(let i=0;i<nameEmojis.length;i++){
              embed.addField(nameEmojis[i],iconEmojis[i])
              switch(i){
                case 50:
                  message.channel.send(embed);
                  embed.fields = [];
                break;
                case 100:
                   message.channel.send(embed);
                  embed.fields = [];
                break;
              }
      }*/
    

      /*const emojiList = client.guild.emojis.cache.map(emoji => emoji.toString()).join(" ");


		.setDescription(emojiList);*/
  //message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.MISC.EMOJI;