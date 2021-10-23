const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home/index');
	console.log('I am here');
});
router.get('/home', (req, res) => {
	res.render('home/home');
});

router.get('/about', (req, res) => {
	res.render('home/about');
});

router.get('/settings', (req, res) => {
	res.render('home/settings', { currentChannel: `${process.env.TWITCH_CHANNEL}` });
});


router.post('/settings', (req, res) => {

	var inputChannel = req.body.channel;
	console.log(req.body);

	if(inputChannel.length > 3 && inputChannel != `${process.env.TWITCH_CHANNEL}` && req.body.sureCheckbox) {
		process.env['TWITCH_CHANNEL'] = inputChannel;
	}

	res.render('./home/settings', { currentChannel: `${process.env.TWITCH_CHANNEL}` });
});



module.exports = router;
