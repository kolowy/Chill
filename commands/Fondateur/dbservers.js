const { MessageEmbed } = require('discord.js');
const color = "RANDOM";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async(client, message, args) => {
    let guild = member.guild;
    let guildData = await client.data.getGuildDB(guild.id); // Get guild document from database
    console.log(guildData)

    message.channel.send("Waw")

};

module.exports.help = {
    name: "dbserv",
    aliases: ["dbs"],
    category: "fondateur",
    description: "liste les servs dans la db",
    cooldown: 10,
    usage: "Secret",
    permissions: false,
}