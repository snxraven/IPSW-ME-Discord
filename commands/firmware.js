var IPSWAPI = require('unirest');
const Pagination = require('discord-paginationembed');
var finalArray = []
let test;
let parsedJSON;
let firmwaresArray;
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete() // Clean the channel

  let argscmd = message.content.split(" ").slice(1);
  let word = argscmd.slice(0).join(" ");
  if (!word) return message.channel.send("You must supply a device to look for")

  IPSWAPI.get('https://api.ipsw.me/v4/device/' + word + '?type=ipsw')
    .then((response) => {
      parsedJSON = JSON.parse(response.raw_body)
      firmwaresArray = parsedJSON["firmwares"]

      firmwaresArray.forEach(firmwareList => {
        finalArray.push({ firmwares: firmwareList.version + "\n" + firmwareList.buildid + "\n" + firmwareList.md5sum + "\nSigned: " + firmwareList.signed + "\n" + "[Download](" + firmwareList.url + ") \n" })

      });

      const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(finalArray)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setElementsPerPage(3)
        // Initial page on deploy
        .setPage(1)
        .setPageIndicator(true)
        .formatField('Firmwares', i => i.firmwares)
        // Deletes the embed upon awaiting timeout
        .setDeleteOnTimeout(true)
        // Disable built-in navigation emojis, in this case: 🗑 (Delete Embed)
        .setDisabledNavigationEmojis(['delete'])
        // Sets whether function emojis should be deployed after navigation emojis
        .setEmojisFunctionAfterNavigation(false);

      FieldsEmbed.embed
        .setColor(3066993)
        .setDescription('Firmwares for: ' + parsedJSON.identifier);

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
  aliases: ["f"],
  permLevel: "User"
};

exports.help = {
  name: "firmware",
  category: "Download",
  description: "Lists Firmware Downloads per device identifier",
  usage: "firmware iPad2,5"
};
