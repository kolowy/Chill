const { logManager } = require("../../log/index.js");

module.exports = async (client, error) => {
    logManager(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, 2);
};