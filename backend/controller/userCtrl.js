const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const dotenv = require('dotenv');
dotenv.config({ path:'./config.env' });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100,
  });
};

const createToken = (user, statusCode, res) => {

  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly:true
  });
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.protect = catchAsync(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(new AppError('You are not logged in!Please log in to access',401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.registerUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
 
  if (user) return next(new AppError('The user already exists', 401));
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm:req.body.passwordConfirm
  });
  createToken(newUser, 201, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('The email id or the password is invalid', 401));
  createToken(user, 201, res);
});

exports.deleteMe = catchAsync((req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Hello from the server side',
  });
});

exports.updateMe = catchAsync((req, res, next) => {
  res.status(200).json({
    status: sucess,
    data: 'Hello from the server side',
  });
});

exports.fetchUser = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    users,
  });
});

exports.restrictTo = catchAsync(async (req, res, next) => {
  const user = User.findOne({ user: req.user.id });

  if (!user.role === 'user') {
    return next(new AppError('You dont have access to this route', 404));
  }

  next();
});

exports.logout = catchAsync(async(req, res, next) =>{
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly:true
    });
    res.status(200).json({ status: 'success' });
  
})
exports.myAccount = catchAsync(async(req, res, next) =>{

    res.status(200).json({ 
    status: 'success',
    user:req.user
   });
  
})