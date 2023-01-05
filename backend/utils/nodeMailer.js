const nodeMailer = require('nodemailer')

const sendEmail = async (args) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
    },
  })
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: args.email,
    subject: args.subject,
    text: args.message,
  }
  await transporter.sendMail(mailOptions)
}
module.exports = {
  sendEmail,
}
