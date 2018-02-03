const Discord = require('discord.js');
const cards = require('../json/cards.json');
const locations = require('../json/equip_locations.json');

module.exports.run = async(bot, message, args, authorID, botID) => {
	let card = cards[Math.floor(Math.random() * cards.length)];

	let location = locations[card.equip_locations];

	let card_image = `https://static.divine-pride.net/images/items/cards/${card.id}.png`;
	let item_collection = `https://static.divine-pride.net/images/items/collection/${card.id}.png`;
	
	let image = item_collection;
	if (location) {
		card.name_japanese = card.name_japanese + " ["+location+"]";
		image = card_image;
	}

	message.channel.send(`<@${authorID}>, đây là item mà bạn bốc được :yum:\n`);
	let msgDescription = "Script:\n" +
						 "`"+card.script+"`";

	let embed = new Discord.RichEmbed()
		.setTitle(card.name_japanese)
		.setColor("#1abc9c")
		.setImage(image)
		.setURL(`https://www.divine-pride.net/database/item/${card.id}/`)
		.setDescription(msgDescription);

	message.channel.send({embed: embed});
}


module.exports.command = {
    name: "card"
}
