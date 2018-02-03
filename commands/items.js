const itemData = require("../json/items.json");
const locations = require('../json/equip_locations.json');
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
        let name = item.name_japanese;
    	if (item.slots != null) {
			name = item.name_japanese + `[${item.slots}]`;
		}

		if (item.price_sell == null && item.price_buy != null) {
			item.price_sell = item.price_buy/2;
		}

		let msgDescription = "Item ID: " + item.id + "\t" +
			                 "Price: " + item.price_buy + "\t" +
			                 "Sell: " + item.price_sell + "\t" +
			                 "Weight: " + item.weight + "\n" +
		                 	 "Script: `" + item.script + "`";

		let image = "https://static.divine-pride.net/images/items/collection/"+ item.id +".png";

		if (item.type == 6) {
			let card_image = `https://static.divine-pride.net/images/items/cards/${item.id}.png`;
			let location = locations[item.equip_locations];

			if (location) {
				name = item.name_japanese + " ["+location+"]";
				image = card_image;
			}
		}
		
		let embed = new Discord.RichEmbed()
			.setTitle("Name: " + name)
			.setColor("#1abc9c")
			.setThumbnail(image)
			.setURL("http://db.irowiki.org/db/item-info/"+ item.id +"/")
			.setDescription(msgDescription);

		message.channel.send({embed: embed});
    }

	// msg.delete();
}


module.exports.command = {
    name: "items"
}
