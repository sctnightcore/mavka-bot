const itemData = require("../json/items.json");
const jsonQuery = require('json-query');
const Discord = require('discord.js');
var config = require('../config.json');

module.exports.run = async(bot, message, args, authorID, botID) => {
    let entry = args.join(" ").toUpperCase();

    if(!entry) return message.channel.send(`<@${authorID}>, Mavka không tìm thấy kết quả bạn yêu cầu :flushed:`);

    // let msg = await message.channel.send(`Mavka đang tìm kiếm thông tin item...`);

    let query = `[* name_upper ~/^[^]*${entry}.*/ | id = ${entry}]`;
	
	let items = jsonQuery(query, {data: itemData, allowRegexp: true}).value;

	let total_items = items.length;
	if (total_items == 0) {
		return message.channel.send(`<@${authorID}>, Mavka không tìm thấy kết quả bạn yêu cầu :flushed:`);
	}

    message.channel.send(`<@${authorID}>, đây là một số kết quả mà Mavka tìm thấy cho bạn:`);
    
    let limit_result = config.limit_result;
    if (total_items < config.limit_result) {
		limit_result = total_items
    }

    for (i = 0; i <= (limit_result - 1); i++) {
        let item = items[i];

    	if (item.slots != null) {
			item.name_japanese = item.name_japanese + `[${item.slots}]`;
		}

		if (item.price_sell == null && item.price_buy != null) {
			item.price_sell = item.price_buy/2;
		}

		let msgDescription = "Item ID: " + item.id + "\t" +
			                 "Price: " + item.price_buy + "\t" +
			                 "Sell: " + item.price_sell + "\t" +
			                 "Weight: " + item.weight + "\n" +
		                 	 "Script: `" + item.script + "`";
		
		let embed = new Discord.RichEmbed()
			.setTitle("Name: " + item.name_japanese)
			.setColor("#1abc9c")
			.setThumbnail("http://db.irowiki.org/image/item/"+ item.id +".png")
			.setURL("http://db.irowiki.org/db/item-info/"+ item.id +"/")
			.setDescription(msgDescription);

		message.channel.send({embed: embed});
    }

	// msg.delete();
}


module.exports.command = {
    name: "items"
}
