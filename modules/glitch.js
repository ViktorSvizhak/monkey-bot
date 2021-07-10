const http = require('http');
const express = require('express');
const logger = require('./logger');

const app = express();

module.exports = () => {
    app.get('/', (request, response) => {
        logger.info('Ping Received')
        response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
        logger.info('Send tick');
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 240000);
}