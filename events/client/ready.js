const { MessageEmbed } = require("discord.js")
const moment = require("moment");
const status = "online"; 
const color = "GREEN";
const {logManager} = require("../../log/index.js")
var packageLoader_1 = require("../../packageLoader");
const Topgg = require(`@top-gg/sdk`)

const api = new Topgg.Api(process.env.TOPGG)



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
	setInterval(() => {
	  api.postStats({
	    serverCount: client.guilds.cache.size,
	    //shardId: client.shard.ids[0], // if you're sharding
	    shardCount: client.options.shardCount
	  })
	}, 1800000)

    const start = new MessageEmbed()
        .setColor(color)
        .setTitle("BOT ON ! :white_check_mark: ")
        .addFields(
        { name:"Users", value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, inline: true },
        { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Status", value: `${status}`, inline: true },
        { name: "Date", value: `${moment(client.user.onAt).utcOffset('+0100').format("DD/MM/YYYY à HH:mm")}`, inline: true },
        );
console.log(client.api.applications(client.user.id).guilds('752812593961369641').commands.get())

    client.api.applications(client.user.id).guilds('752812593961369641').commands.post({
        data: {
            name: "ping",
            description: "ping le bot"
        },
    data: {
            name: "chill",
            description: "lien d'invitation"
        }
    });
	client.api.applications(client.user.id).guilds('813708731673346048').commands.post({
        data: {
            name: "ping",
            description: "ping le bot"
        },
    data: {
            name: "chill",
            description: "lien d'invitation"
        }
    });





    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'ping'){ 
            // here you could do anything. in this sample
            // i reply with an api interaction
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'Latence du BOT : '+ Math.round(client.ws.ping) + ' ms'
                    }
                }
            })
        }
        if (command === 'chill'){ 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "[inviter le bot sur votre serveur !](https://discord.com/api/oauth2/authorize?client_id=752812712165376083&permissions=8&scope=applications.commands%20bot)\n \n[Rejoindre notre serveur !](https://discord.gg/c4RvJUCBEW)\n"
                    }
                }
            })
        }
    })
};