var IPSWAPI = require('unirest');
const Pagination = require('discord-paginationembed');
var devicesArray = []
let test;
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete() // Clean the channel

  let argscmd = message.content.split(" ").slice(1);
  let word = argscmd.slice(0).join(" ");
  if (!word) return message.channel.send("You must supply a device to look for")

  IPSWAPI.get('https://api.ipsw.me/v4/devices')
    .then((response) => {
      let parsedJSON = JSON.parse(response.raw_body)

      parsedJSON.forEach(deviceList => {

        if (deviceList.name.toLowerCase().includes(word.toLowerCase()) || deviceList.identifier.toLowerCase().includes(word.toLowerCase()) || deviceList.boardconfig.toLowerCase().includes(word.toLowerCase()) )
          devicesArray.push({ devices: deviceList.name + "\n" + deviceList.identifier + "\n" + deviceList.boardconfig + "\n" })
      });

      const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(devicesArray.reverse())
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setElementsPerPage(5)
        // Initial page on deploy
        .setPage(1)
        .setPageIndicator(true)
        .formatField('Devices', i => i.devices)
        // Deletes the embed upon awaiting timeout
        .setDeleteOnTimeout(true)
        // Disable built-in navigation emojis, in this case: 🗑 (Delete Embed)
        .setDisabledNavigationEmojis(['delete'])
        // Set your own customised emojis


        // Sets whether function emojis should be deployed after navigation emojis
        .setEmojisFunctionAfterNavigation(false);

      FieldsEmbed.embed
        .setColor(3066993)
        .setDescription('Search Results');

      (async () => {
        await FieldsEmbed.build();
      })();
    })
    .catch(err => {
      console.log(err)
    })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s"],
  permLevel: "User"
};

exports.help = {
  name: "search",
  category: "Information",
  description: "Search for devices.",
  usage: "search iphone"
};
