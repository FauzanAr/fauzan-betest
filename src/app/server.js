const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = jsYaml.load((fs.readFileSync(path.join(__dirname, '../documentation/swagger.yaml'), 'utf8')));

const mongodb = require('../helpers/databases/mongodb/connection');
const userHandlerApi = require('../modules/user/handlers/api');
const { verifyAuth } = require('../helpers/auth/jwt/middleware');

class Server {
    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());

        // Documentation
        this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

        this.server.get('/test', (req, res) => {
            res.json({ message: 'server up and running' });
        });

        // Route modules
        this.server.get('/user/v1', verifyAuth, userHandlerApi.getUser);
        this.server.post('/user/v1', userHandlerApi.createUser);
        this.server.put('/user/v1', verifyAuth, userHandlerApi.updateUser);
        this.server.delete('/user/v1', verifyAuth, userHandlerApi.deleteUser);
        this.server.post('/user/v1/login', userHandlerApi.login);
        this.server.put('/user/v1/email', verifyAuth, userHandlerApi.updateEmailUser);
        this.server.put('/user/v1/password', verifyAuth, userHandlerApi.updatePasswordUser);
    }

    async init(port) {
        await Promise.all([
            mongodb.init()
        ]);
        this.server.listen(port, () => {
            console.log(`App running on port: ${port}`);
        });
    }
}

module.exports = Server;