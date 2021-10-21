require('dotenv').config();
require('log-to-file');

const fs = require('fs');
const tmi = require('tmi.js');
const log = require('log-to-file');

const emotesConf = JSON.parse(fs.readFileSync('emotes.json'));


const logDir = "./logs/" + `${process.env.TWITCH_CHANNEL}`;

//create log dir if does not exist
if(!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: `${process.env.TWITCH_USERNAME}`,
		password: `oauth:${process.env.TWITCH_OAUTH}`
	},
	channels: [`${process.env.TWITCH_CHANNEL}`]
}
);

client.connect().catch(console.error);

client.on('timeout', (channel, username, reason, duration, userstate) => {
	log('userstate:' + userstate + ', user:' + username + ", duration: " + duration, logDir + '/Timeout.log');
});
client.on('ban', (channel, username, reason, userstate) => {
	log('userstate:' + userstate + ', user:' + username, logDir + '/Ban.log');
});

client.on('message', (channel, userInfo, message, self) => {

	if(self)
		return;

	var messageLowerCase = message.toLowerCase();
	if(userInfo.mod)
		log('message:' + message + ', user:' + userInfo.username, logDir + '/modMessages.log');
	if(message.search(/(Maute_)/i) != -1)
		log('message:' + message + ', user:' + userInfo.username, logDir + '/pingMsgs.log');


	if(emotesConf[messageLowerCase]) {
		client.say(channel, emotesConf[messageLowerCase]);
		return;
	}

	// search for emote in message via json
	for(let emote in emotesConf) {

		//get single word with emote
		var regEmote = new RegExp("\\b(" + emote + ")\\b", 'i');

		if(message.search(regEmote) != -1) {
			client.say(channel, emotesConf[emote]);
			log('message:' + message + ', user:' + userInfo.username, logDir + '/SentMessageLog.log');
			return;
		}
	}
});
