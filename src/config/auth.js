const jwt = require('jsonwebtoken');
const authConfig = require('./auth.json');
const localStorage = require('./node-localstorage');

module.exports = async (req, res, next) => {
    const header = localStorage.getItem('token');

    if(!header){
        return res.render("Unauthorized.html");
    };

    const parts = header.split(' ');

    if(!parts.length === 2){
        return res.render("Unauthorized.html");
    };

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.render("Unauthorized.html");
    };

    await jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({error: 'unauthorized'});

        req.userId = decoded.id;
        return next();
    });
}