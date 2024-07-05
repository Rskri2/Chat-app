const nodemailer = require('nodemailer');
const pug = require('pug');
const {convert} = require('html-to-text');

module.exports = class Email{
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ramkri <${process.env.EMAIL}>`
  }

  newTransport(){
    // if(process.env.NODE_ENV === 'production') {
    //   return 1
    // }
    return   nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
    });
  }

  async send(template, subject){

     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
      firstName:this.firstName,
      url:this.url,
      subject
     });
     
     const mailOptions = {
      from:this.from,
      to: this.to,
      subject,
      html,
      text:convert(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(){
  await  this.send('welcome','Welcome to the natours family');
  }

  async sendPasswordResetToken(){

  await  this.send('passwordReset','Your password reset token valid only for 10 mins');

  }
}

