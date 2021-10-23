const express = require('express');
const emotesSend = require('../../sendemotes');
const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });
const bot = require('../../app.js');

router.get('/', (req, res) => res.render('./twitch/index'));
router.get('/chat', (req, res) => {
	res.render('./twitch/chat', { defaultUrl: '/twitch/chat' });
});
router.get('/emotes', (req, res) => {
	res.render('./twitch/emotes', { defaultUrl: '/twitch/emotes' });
});


router.post('/chat/:name', (req, res) => {
	changeServerStatus(req.params.name, req.body.channel);
	res.render('./twitch/chat', { defaultUrl: '/twitch/chat' });
});


router.post('/emotes/:emoteid', (req, res) => {
	console.log(req.params.emoteid);
	emotesSend(req.params.emoteid);
	res.render('./twitch/emotes', { defaultUrl: '/twitch/emotes' });
});

module.exports = router;
