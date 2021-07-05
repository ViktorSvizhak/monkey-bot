const http = require('http');
const express = require('express');
const app = express();

let start = function (){
    app.get("/", (request, response) => {
        console.log(Date.now() + " Ping Received");
        response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
        console.log('TICK');
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 240000);
}

module.exports = {
    start: start,
    token: process.env.bot_token
};