'use strict';

// Get token and prefix from config file 
// necesitas un json con un prefijo para el bot y el token del bot que vayas a usar 
const { prefix, token } = require('./config.json');

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // Si el bot no está en el canal no puede saber si están hablando usa !join y entra 
  if (message.content === `${prefix}join`) {
    if (message.member.voice.channelID !== undefined) {
      const channel = client.channels.cache.get(message.member.voice.channelID);
      channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
    } else {
      message.channel.send('Bobo o qué no estás en ningún canal de voz');
    }
  }
});

client.on("guildMemberSpeaking", function(member, speaking){
  if (speaking) {
    const channel = client.channels.cache.find(channel => channel.name === "biblioteca")
    channel.send(member.user.username + " cállate la puta boca")
  }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(token);