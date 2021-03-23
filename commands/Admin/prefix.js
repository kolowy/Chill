const { MessageEmbed } = require('discord.js');
module.exports.run = (client, message, args) => {
    message.delete({ timeout: 1000 });

    let guild = message.member.guild.id;
    let user = message.author;

    let embed = new MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setAuthor(user.username, user.avatarURL())
        .setTitle(`Le prefix a été mis à jour en:\t` + args[0]);
    if (args[0].length > 4) {
        let embedChar = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle(`La commande prefix requière 4 caractères maximum`);
        return message.channel.send(embedChar)
    }
    client.data.setPrefix(guild, args[0])
    message.channel.send(embed)
};


module.exports.help = {
    name: "prefix",
    aliases: ["prefix"],
    category: "admin",
    description: "set prefix by server",
    cooldown: 10,
    usage: "",
    permissions: true,
    args: true,
}