var IPSWAPI = require('unirest');
const Pagination = require('discord-paginationembed');
var devicesArray = []
let test;
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete() // Clean the channel

  let argscmd = message.content.split(" ").slice(1);
  let word = argscmd.slice(0).join(" ");
  if (!word) return message.channel.send("You must supply a model to look for")

  IPSWAPI.get('https://api.ipsw.me/v4/model/' + word)
    .then((response) => {
      parsedJSON = JSON.parse(response.raw_body)
      message.channel.send("That model is: " + parsedJSON.identifier)
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["m"],
  permLevel: "User"
};

exports.help = {
  name: "model",
  category: "Information",
  description: "Find your device identifier using your model.",
  usage: "model A1670"
};
