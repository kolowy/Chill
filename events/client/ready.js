const { MessageEmbed } = require("discord.js")
const moment = require("moment");
const status = "online"; 
const color = "GREEN";
const {logManager} = require("../../log/index.js")
var packageLoader_1 = require("../../packageLoader");

module.exports = async (client, message, member) => {
    let activities = [`${client.config.PREFIX}help ⚙`, 'http://82.121.254.56:30/', 'BOT communautaire', `Observe les ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`], i = 0;

    setInterval(() => client.user.setPresence({
        status: status,
        activity: {
            name: `${activities[i++ % activities.length]}`,
            type: "PLAYING", //PLAYING - STREAMING - LISTENING - WATCHING - COMPETITOR
            }
        }), 5000
    );

    const start = new MessageEmbed()
        .setColor(color)
        .setTitle("BOT ON ! :white_check_mark: ")
        .addFields(
        { name:"Users", value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, inline: true },
        { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Status", value: `${status}`, inline: true },
        { name: "Date", value: `${moment(client.user.onAt).utcOffset('+0100').format("DD/MM/YYYY à HH:mm")}`, inline: true },
        );

    // client.channels.cache.get(client.config.logChannel).send(start)
};