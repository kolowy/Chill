const Discord = require("discord.js")
const color = ("#007fff"); // Require to update for have white, before black, now green (Minecraft color [tl-logo]).
const ADMIN = process.env.ADMIN.split(',');

module.exports.run = async (bot, message, args) => {
    let notAccess=true;
    for (let i = 0; i < ADMIN.length; i++) {
        if(ADMIN[i]==message.author.id){
          notAccess=false;
      }
    }
    if(notAccess== false) {
      
        if (!args[0]) {
            let reportEmbed = new Discord.MessageEmbed()
                .setTitle("Error", message.guild.iconURL)
                .setDescription(" ")
                .setColor("#ff0000")
                .addField("Reason:", "Specify the command.")
                .setTimestamp()
            message.channel.send(reportEmbed);
        } else {
            let commandName = args[0]

            try {
                delete require.cache[require.resolve(`../${commandName}.js`)] // usage !reload <name>
                bot.commands.delete(commandName)
                const pull = require(`../${commandName}.js`)
                bot.commands.set(commandName, pull)
                let reportEmbed = new Discord.MessageEmbed()
                    .setTitle("Reload", message.guild.iconURL)
                    .setDescription(" ")
                    .setColor(color)
                    .addField(`The command has been reloaded:`, `\`${args[0]}\``)
                    .setTimestamp()
                message.channel.send(reportEmbed);
            } catch (e) {
		console.log(e)
                let reportEmbed = new Discord.MessageEmbed()
                    .setTitle("Error", message.guild.iconURL)
                    .setDescription(" ")
                    .setColor("#ff0000")
                    .addField("Reason:", `Could not reload: \`${args[0]}\``)
                    .setTimestamp()
                message.channel.send(reportEmbed);
            }
        }
    } else {
        const embed = new MessageEmbed()
            .setTitle("Vous n'etes pas fondateurs et donc vous n'avez pas accès à cette commande !")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            .setColor("GREEN");
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "reload",
    aliases: ["rc"],
    category: "fondateur",
    description: "Actualise une cmd.",
    cooldown: 10,
    usage: "<command_name>",
    permissions: true,
    args: true,
}
