const mobData = require("../json/monsters.json");
const elements = require("../json/elements.json");
const jsonQuery = require('json-query');
const Discord = require('discord.js');

module.exports.run = async(bot, message, args, authorID, botID) => {
    let entry = args.join(" ").toUpperCase();

    if(!entry) return message.channel.send(`<@${authorID}>, Mavka không tìm thấy monster bạn yêu cầu :flushed:`);

    // let msg = await message.channel.send(`Mavka đang tìm kiếm thông tin monster...`);

	let query = `[* iName = ${entry} | id = ${entry}]`;
	
	let result = jsonQuery(query, {data: mobData}).value;

	if (result.length == 0) {
		return message.channel.send(`<@${authorID}>, Mavka không tìm thấy monster bạn yêu cầu :flushed:`);
	}

	let monster = result[0];

	let msgDescription = "Mob ID: " + monster.id + "\n" +
		                 "Level: " + monster.LV + "\n" +
		                 "HP: " + monster.HP + "\n" +
		                 "Base Experience: " + monster.EXP + "\n" +
		                 "Job Experience: " + monster.JEXP;
	
	let mobElement = elements[monster.Element];

	if (mobElement) {
		msgDescription += "\nElement: *" + mobElement.type + "* - lvl " + mobElement.level;
	}
	
	let embed = new Discord.RichEmbed()
		.setTitle("Name: " + monster.name)
		.setColor("#1abc9c")
		.setThumbnail("http://file5.ratemyserver.net/mobs/"+ monster.id +".gif")
		.setURL("https://www.divine-pride.net/database/monster/"+ monster.id +"/")
		.setDescription(msgDescription);

    message.channel.send(`<@${authorID}>, đây là kết quả mà Mavka tìm thấy cho bạn:`);
	message.channel.send({embed: embed});
	// msg.delete();
}


module.exports.command = {
    name: "mobinfo"
}
