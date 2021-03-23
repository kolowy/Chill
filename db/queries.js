const Discord = require("discord.js");
const guildsDB = require("./schema/guildSchema");


//Create/find Guilds Database
module.exports.getGuildDB = async function(gId) {
    let guildDB = await guildsDB.findOne({ guildId: gId });
    if (guildDB) {
        return guildDB;
    } else {
        guildDB = new guildsDB({ guildId: gId })
        await guildDB.save().catch(err => console.log(err));
        return guildDB;
    }
}

module.exports.setPrefix = async function(id, pref) {
    const update = { prefix: pref };
    await guildsDB.findOneAndUpdate({ guildId: id }, update);
}