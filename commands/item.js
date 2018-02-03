// iteminfo alias

const iteminfo = require("./iteminfo.js");

module.exports.run = async(bot, message, args, authorID, botID) => {
	iteminfo.run(bot, message, args, authorID, botID);
}


module.exports.command = {
    name: "item"
}