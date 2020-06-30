const express = require('express');
const routes = express();
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

const feedJS = require('../public/scripts/Feed');

nunjucks.configure("src/views", {
    express: routes,
    noCache: true
});

routes.use(express.static("public"));

//
routes.get('/login', (req, res) => {return res.render("Login.html")});
//
routes.get('/signup', (req, res) => {return res.render("Signup.html")});
//
routes.get('/feed', async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await fetch('http://localhost:3333/poem', fetchOptions)
        .then(res => res.json())
            .then(poems => {
                return res.render("Feed.html", {poems: poems});
            }).catch(err => console.log(err))
});
//
routes.get('/newPoem', (req, res) => {return res.render("RegisterPoems.html")});
//
routes.get('/poem', async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let {id} = req.query;

    
    await fetch("http://localhost:3333/poem/"+id, fetchOptions)
        .then(res => res.json())
            .then(result => {
                const [{title, poem, user}] = result;

                let data = {
                    title,
                    poem,
                    user
                };

                return res.render("Poem.html", {poem: data});
            });
});

module.exports = routes;