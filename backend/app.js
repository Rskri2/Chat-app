const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require(`${__dirname}/utils/AppError`)
const userRouter = require(`${__dirname}/routes/userRoutes`);
// const incomeRouter = require('./routes/income/incomeRoutes');
// const expensesRouter = require('./routes/expenses/expensesRoutes');
// const appRouter = require('./routes/expenses/appRoutes')
// const dbConnect = require('./config/dbConnect');

// const AppError = require("../utils/AppError");
const errorControllers = require(`${__dirname}/controller/errorCtrl`);
const app = express();

app.use(cors({
  origin:'*',
  credentials:true
}))

app.set('view engine','pug');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false }))
// app.use(express.static(path.join(__dirname,'public')));
// app.set('views','pug');

const DB =process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

const dbConnect = async() => {
  try{
    await mongoose.connect(DB)
    console.log("db connected")
  } catch(err){
    console.log(err);
    }
  }
dbConnect();

// app.use('/', appRouter)
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/income',incomeRouter);
// app.use('/api/v1/expenses',expensesRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found on this site`, 404));
});

app.use(errorControllers)
module.exports = app;
