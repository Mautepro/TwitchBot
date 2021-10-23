const express = require('express');

const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });


router.get('/', (req, res) => res.render('./twitch/index'));
router.get('/chat', (req, res) => res.render('./twitch/chat'));
router.get('/emotes', (req, res) => res.render('./twitch/emotes'));

router.post('/chat', (req, res) => {
	console.log(req.body.channel);
	require('../../app.js');
});

module.exports = router;
