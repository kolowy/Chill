const { readdirSync } = require("fs");
const { logManager } = require("../log/index.js");



//Appel des commandes 
const loadCommands = (client, dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      logManager(`Commande chargée : ${getFileName.help.name}`, -1);
    };
  });
};
  
  //Appel des events
const loadEvents = (client, dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      logManager(`Evènement chargée : ${evtName}`, -1);
    };
  });
};

//Chargement des commandes/events
module.exports = {
    loadCommands,
    loadEvents
};