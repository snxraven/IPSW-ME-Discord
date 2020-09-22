# IPSW-ME-Discord

The goal of this project is to allow the information from https://ipsw.me to be easily viewable and accessible within discord. 

## Installation

Use NPM to install the required modules

```bash
npm i 
```

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 12.0.0 or higher](https://nodejs.org)
- The node-gyp build tools. This is a pre-requisite for Enmap, but also for a **lot** of other modules. See [The Enmap Guide](https://enmap.evie.codes/install#pre-requisites) for details and requirements for your OS. Just follow what's in the tabbed block only, then come back here!

You also need your bot's token. This is obtained by creating an application in
the [Developer section](https://discord.com/developers) of discord.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html) 
for more info.

IPSW-ME-Discord uses intents which are required as of October 7, 2020. By default we use `Intents.All`, however this has privileged intents. You can enable this in the bot page 
(the one you got your token from) under `Privileged Gateway Intents`.

If you don't want to enable privileged intents you can change the client from 
```js
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
```
to 
```js
const client = new Discord.Client({ ws: { intents: Discord.Intents.NON_PRIVILEGED } });
``` 
in your index.js. 

**WARNING: Changing this will disable welcome messages!**

For more info about intents checkout the [official Discord.js guide page](https://discordjs.guide/popular-topics/intents.html) and the [official Discord docs page](https://discord.com/developers/docs/topics/gateway#gateway-intents).
## Downloading

In a command prompt in your projects folder (wherever that may be) run the following:

`git clone https://github.com/snxraven/IPSW-ME-Discord.git`

Once finished: 

- In the folder from where you ran the git command, run `cd IPSW-ME-Discord` and then run `npm install`
- **If you get any error about python or msibuild.exe or binding, read the requirements section again!**
- Run `node setup.js` to generate a proper configuration file and settings.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node index.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it. 

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)
