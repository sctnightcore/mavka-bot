// !mobinfo alias

const mobinfo = require("./mobinfo.js");

module.exports.run = async(bot, message, args, authorID, botID) => {
	mobinfo.run(bot, message, args, authorID, botID);
}


module.exports.command = {
    name: "monster"
}