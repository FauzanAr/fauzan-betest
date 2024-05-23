const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());

        this.server.get('/test', (req, res) => {
            res.json({ message: 'server up and running' });
        });

        // Route modules
    }

    async init(port) {
        this.server.listen(port, () => {
            console.log(`App running on port: ${port}`);
        });
    }
}

module.exports = Server;