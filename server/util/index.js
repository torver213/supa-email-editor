const nodemailer = require("nodemailer");
const config = require("../config");

const { mailConfig } = config;

const mailAccountDispatcher = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    pool: true,
    secure: mailConfig.port === 465 ? true : false,
    maxMessages: 500,
    maxConnections: 500,
    auth: {
      user: mailConfig.account.user,
      pass: mailConfig.account.pass,
    },
  });
  let info = await transporter.sendMail({
    from: mailConfig.account.user,
    ...mailOptions,
  });
  return { info };
};
const sendMailToUsers = async (data) => {
  try {
    await mailAccountDispatcher({
      to: data.email, // list of receivers
      subject: data.title, // Subject line
      html: data.htmlTemplate, // plain text body
    });
    return { error: false, message: "Mail Dispatched Successfully" };
  } catch (error) {
    return {
      error: true,
      message: "An error occurred trying to send mail to user",
    };
  }
};
module.exports = {
  sendMailToUsers,
};
