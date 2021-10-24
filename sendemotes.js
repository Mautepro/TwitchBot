require('dotenv').config();
require('log-to-file');

const fs = require('fs');
const tmi = require('tmi.js');
const emotesConf = JSON.parse(fs.readFileSync('./config/emotes.json'));

var client = new tmi.Client({
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

var channel = `${process.env.TWITCH_CHANNEL}`;

sendEmote = function(emote) {

	reconnectNewChannel();

	if(channel != `${process.env.TWITCH_CHANNEL}`) {
		channel = `${process.env.TWITCH_CHANNEL}`;
	}

	ping();

	if(emotesConf[emote.toLowerCase()])
		client.say(channel, emotesConf[emote.toLowerCase()]).catch((err) => console.log(err));
};

module.exports = function(emote) {
	sendEmote(emote);
};

function Sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// ping client, if no response it will connect
function ping() {
	client.ping().then((pingsuccessful) => {
		console.log(pingsuccessful);
	}).catch((error) => {
		client.connect();
	});
};

// if enviroment variable for channel has changed -> disconnect and conntect to new channel
async function reconnectNewChannel() {
	if(client.getChannels()[0]) {
		if(`${process.env.TWITCH_CHANNEL}` != client.getChannels()[0] && `${process.env.TWITCH_CHANNEL}` != client.getChannels()[0].substring(1).toLowerCase()) {
			console.log("reconnecting....");
			client.part(client.getChannels()[0]);
			client.join(`${process.env.TWITCH_CHANNEL}`);
			console.log("..");
			await Sleep(3000);
			console.log("....");
			client["channels"] = [`${process.env.TWITCH_CHANNEL}`];
			client.disconnect();
			await Sleep(2300);
			console.log("......");
			client.connect();
			await Sleep(3000);
			console.log("connected....");
		}
	}
}
