const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const localStorage = require('../config/node-localstorage');
const authPages = require('../config/auth');

//token routes
router.post('/token', (req, res) => {
    const {token} = req.body;

    if(token == undefined){
        return res.send(false);
    }

    const auth = `Bearer ${token}`;

    localStorage.setItem('token', auth);
    
    return res.send(true);

    console.log(token)
});
router.get('/token', (req, res) => { //retorna null se não existir um token
    const token = localStorage.getItem('token');
    return res.json(token);
});
router.delete('/token', (req, res) => {
    localStorage.removeItem('token');
    return res.send(true);
});
//
router.get('/login', (req, res) => {return res.render("Login.html")});
//
router.get('/signup', (req, res) => {return res.render("Signup.html")});
//

router.use(authPages);

//
router.get('/feed', async (req, res) => {
    const token = localStorage.getItem('token');

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    await fetch(`${process.env.API_PROD}/api/poems`, fetchOptions)
        .then(res => res.json())
            .then(poems => {
                return res.render("Feed.html", {poems: poems});
            }).catch(err => console.log(err));
});



module.exports = router;