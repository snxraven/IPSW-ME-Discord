var IPSWAPI = require('unirest');
const Pagination = require('discord-paginationembed');
var releaseArray = [] // This just holds a ton of release dates, and are probably not needed. 
var finalReleaseData = [] // This array holds the data the the user actually sees. Line #'s 20 and 25

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete() // Clean the channel

  IPSWAPI.get('https://api.ipsw.me/v4/releases')
    .then((response) => {
      let parsedJSON = JSON.parse(response.raw_body)

      parsedJSON.forEach(date => {
        releaseArray.push({ date: date.date })

        date.releases.forEach(releaseData => {
          let parseDate = parseISOString(releaseData.date);
          let dateToSend = parseDate.toString().replace('(Coordinated Universal Time', '')

          finalReleaseData.push({ release: releaseData.name + "\n" + dateToSend + "\nCount: " + releaseData.count + "\n" + releaseData.type + "\n" })
        });
      });

      const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(finalReleaseData)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setElementsPerPage(5)
        // Initial page on deploy
        .setPage(1)
        .setPageIndicator(true)
        .formatField('Releases to date:', i => i.release)
        // Deletes the embed upon awaiting timeout
        .setDeleteOnTimeout(true)
        // Disable built-in navigation emojis, in this case: 🗑 (Delete Embed)
        .setDisabledNavigationEmojis(['delete'])
        // Sets whether function emojis should be deployed after navigation emojis
        .setEmojisFunctionAfterNavigation(false);

      FieldsEmbed.embed
        .setColor(3066993)
        .setDescription('Releases');

      (async () => {
        await FieldsEmbed.build();
      })();
    })
    .catch(err => {
      console.log(err)
    })
};

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r"],
  permLevel: "User"
};

exports.help = {
  name: "releases",
  category: "Apple Info",
  description: "A log of all releases to date.",
  usage: "releases"
};
