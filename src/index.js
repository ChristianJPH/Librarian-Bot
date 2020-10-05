'use strict';

// Get token and prefix from config file
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
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('callarse catalufos');
  }
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
      channel.members.forEach((guildMember, memberId) => {
        //debug
        message.channel.send(guildMember.user.username)
        console.log("-----------------------------------")
        //activates when user speaks DOESN'T WORK
        if (guildMember.voice.speaking){
          message.channel.send('Cállate la puta boca');
        }
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