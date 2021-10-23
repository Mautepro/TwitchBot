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

module.exports = router;
