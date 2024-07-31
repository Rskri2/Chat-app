const path = require('path');
const morgan = require('morgan')
const dotenv = require('dotenv');
dotenv.config({ path:'./config.env' });

const app = require('./app');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log('listening to th port',PORT);
})
