const { sendMailToUsers } = require("../util");

const sendEmailService = async (payload) => {
  try {
    const body = {
      email: payload.emails,
      htmlTemplate: payload.mailContent,
      title: payload.subject,
    };
    const res = await sendMailToUsers(body);
    const status = res.error ? 400 : 200;
    return { ...res, data: [], status };
  } catch (error) {
    return { error: true, data: [], message: error.message, status: 500 };
  }
};
module.exports = sendEmailService;
