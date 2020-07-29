const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {return res.render("Login.html")});
router.get('/signup', (req, res) => {return res.render("Signup.html")});
router.get('/feed', (req, res) => {return res.render("Feed.html")});

module.exports = router;