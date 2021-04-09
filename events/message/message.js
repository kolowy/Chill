const { Collection, MessageEmbed } = require("discord.js");
require('dotenv').config()
const ADMIN = process.env.ADMIN.split(',');
const moment = require("moment");
const color = "YELLOW";

module.exports = async(client, message) => {


    //Définition de l'accès fermé
    let notAccess = true;
    for (let i = 0; i < ADMIN.length; i++) {
        if (ADMIN[i] == message.author.id) {
            notAccess = false;
        }
    }
    if (message.author.bot) return;
    /*try {
        guildDB = await client.data.getGuildDB(message.member.guild.id);
        myPrefix = (!guildDB.prefix) ? client.config.PREFIX : guildDB.prefix;
    } catch (e) {
        console.log(e);
    }*/
    //Messages privés, renvoit à l'event directMessage
    if (message.channel.type === "dm") {
        //if (notAccess == true) {
            return client.emit("directMessage", message);
        //};
    };


    //Prefix et arguments
	const myPrefix = "."
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(`${message.author} - Mon préfix est \`${myPrefix}\` !`);
    }
    if (!message.content.startsWith(myPrefix)) return;

    //TODO  prefixDB
    const args = message.content.slice(myPrefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    //NOTE Alias : []
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    //NOTE Prefix
    if (!command) {
        return message.channel.send(`${message.author} - La commande \`${commandName}\` n'existe pas !`);
    }


    //NOTE Permission : true
    if (notAccess == true) {
        if (command.help.permissions && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.guild.channels.cache.get(client.config.cmdChannel).send(`${message.author} - Tu dois être **\`ADMINISTRATEUR\`** du BOT pour faire la commande \`${command.help.name}\` !`);
        }
    };

    //NOTE Args: true
    if (command.help.args && !args.length) {
        let noArgsReply = `${message.author} - Il me faut des arguments pour faire la commande \`${command.help.name}\` !`;

        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${myPrefix}${command.help.name} ${command.help.usage}\``

        return message.channel.send(noArgsReply);
    };

    //Cooldown : chiffre
    if (notAccess == true) {
        //Vérifie si un cooldown existe pour la commande puis créé la collection 
        if (!client.cooldowns.has(command.help.name)) {
            client.cooldowns.set(command.help.name, new Collection());
        };

        //Récupère le temps où la commande a été éxécutée
        const timeNow = Date.now();

        //Récupère la valeur de cooldown de la commande
        const tStamps = client.cooldowns.get(command.help.name);
        const cdAmount = (command.help.cooldown || 0) * 1000;

        //Vérifie si l'utilisateur est présent dans la collection et le temps qu'il reste
        if (tStamps.has(message.author.id)) {
            const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

            //Message d'attente du cooldown
            if (timeNow < cdExpirationTime) {
                timeLeft = (cdExpirationTime - timeNow) / 1000
                return message.channel.send(`${message.author}, merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\` !`);
            };
        };

        //Supression de la collection cooldowns après le temps impartis
        tStamps.set(message.author.id, timeNow);
        setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    }

    /*Log des commandes
	if(notAccess == true){
		if (message.content === client.config.PREFIX) {
  return
	} else {
		if (message.content.startsWith(client.config.PREFIX)) {
			const embed = new MessageEmbed()
				.setColor(color)
				.setAuthor(message.author.tag, message.author.avatarURL())
				.setTitle(message.channel.name)
				.setDescription(message.content)
				.setFooter(message.guild.name, message.guild.iconURL())

  		client.channels.cache.get(client.config.logChannel).send(embed)
			};
		};
  };*/

    //Charge des paramètres pour chaque commande
    command.run(client, message, args);
};