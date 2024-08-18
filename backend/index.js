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

// process.on('unhandledException', (err) => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION');
//     process.exit(1);
//   });
  
//   process.on('unhandledRejection', (err) => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION');
//     server.close(() => {
//       process.exit(1);
//     });
//   });