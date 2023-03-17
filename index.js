const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const { token } = require('./token.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

// Add the bot to a server
client.on('ready', () => {
  const serverID = '703681977798230096';
  const server = client.guilds.cache.get(serverID);
  if (!server) {
    console.error(`Bot is not a member of server with ID ${serverID}`);
    return;
  }
  console.log(`Adding bot to server ${server.name}`);
  server.members.fetch().then(() => {
    server.channels.cache.first().createInvite().then(invite => {
      console.log(`Created invite with code ${invite.code}`);
    }).catch(console.error);
  }).catch(console.error);
});
