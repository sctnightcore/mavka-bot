const itemData = require("../json/items.json");
const jsonQuery = require('json-query');
const Discord = require('discord.js');

module.exports.run = async(bot, message, args, authorID, botID) => {
    let entry = args.join(" ").toUpperCase();

    if(!entry) return message.channel.send(`<@${authorID}>, Bạn phải nhập tên item hoặc ID! :smile: `);

    // let msg = await message.channel.send(`Mavka đang tìm kiếm thông tin item...`);

	let query = `[* name_upper = ${entry} | id = ${entry}]`;
	
	let result = jsonQuery(query, {data: itemData}).value;

	if (result.length == 0) {
		return message.channel.send(`<@${authorID}>, Mavka không tìm thấy item bạn yêu cầu :flushed:`);
	}

	let item = result[0];

	if (item.slots != null) {
		item.name_japanese = item.name_japanese + ` [${item.slots}]`;
	}

	if (item.price_sell == null && item.price_buy != null) {
		item.price_sell = item.price_buy/2;
	}

	let msgDescription = "Item ID: " + item.id + "\n" +
		                 "Price: " + item.price_buy + " Zeny\n" +
		                 "Sell: " + item.price_sell + " Zeny\n" +
		                 "Weight: " + item.weight + "\n" +
		                 "Script: `" + item.script + "`";
	
	let embed = new Discord.RichEmbed()
		.setTitle("Name: " + item.name_japanese)
		.setColor("#1abc9c")
		.setThumbnail("https://static.divine-pride.net/images/items/collection/"+ item.id +".png")
		.setURL("http://db.irowiki.org/db/item-info/"+ item.id +"/")
		.setDescription(msgDescription);

    message.channel.send(`<@${authorID}>, đây là kết quả mà Mavka tìm thấy cho bạn:`);
	message.channel.send({embed: embed});
	// msg.delete();
}


module.exports.command = {
    name: "iteminfo"
}
