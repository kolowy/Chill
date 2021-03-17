const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");
const web = require('./web');

const client = new Client();
client.config = require("./config");
client.logger = require("./util/Logger");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
web();
client.login(process.env.TOKEN);