//ANCHOR touche pas sale noob
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });

//ANCHOR Discord :
const { logManager } = require("./log/index.js");
var packageLoader_1 = require("./packageLoader");
const { loadCommands, loadEvents } = require("./util/loader");
const { Collection } = require("discord.js");
var Discord = __importStar(require("discord.js"));
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.set('useFindAndModify', false);
const config = require("./config.js");

var context = {
    client: new new Client({
        intents: config.intents,
        partials: config.partials
      }),
    pkg: packageLoader_1.pkg
};

context.client.config = config;

logManager('connect db',1);
//Connect to mongoose database
/*mongoose.connect("mongodb://localhost:27017/Chill", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    //If it connects log the following
    console.log("Connected to the Mongodb database.", "log");
}).catch((err) => {
    //If it doesn't connect log the following
    console.log("Unable to connect to the Mongaodb database. Error:" + err, "error");
});
context.client.data = require("./db/queries");*/

//NOTE on ready
context.client.on("ready", function() {
    var _a;
    logManager(" ", 0)
    logManager("〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓", 0)
    logManager("Client logged as " + ((_a = context.client.user) === null || _a === void 0 ? void 0 : _a.tag), 0);
    logManager("Running Cobra v" + context.pkg.version, 0);
    var members = 0;
    var guilds = context.client.guilds.cache.array();
    guilds.forEach(function(guild) {
        members += guild.memberCount;
    });
    logManager("Playing on " + guilds.length + " servers, with " + members + " wonderful peoples !", 0);
    logManager("〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓", 0)
    logManager(" ", 0)
});

//NOTE destroy client, it's better
function handleExit() {
    logManager("Destroying client", 0);
    context.client.destroy();
    process.exit();
}

process.on('SIGINT', function() {
    console.log(); // Add cariage return after the ^C
    handleExit();
});


//NOTE log au serveur
context.client.login(process.env.TOKEN);
["commands", "cooldowns"].forEach(x => context.client[x] = new Collection());

loadCommands(context.client);
loadEvents(context.client);