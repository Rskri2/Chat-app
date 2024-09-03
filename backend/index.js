const path = require('path');
const morgan = require('morgan')
const dotenv = require('dotenv');
dotenv.config({ path:'./config.env' });
const {server} = require('./Socket');
const app = require('./app');
const PORT = 5000;

server.listen(PORT, () => {
    console.log('listening to the port',PORT);
})

