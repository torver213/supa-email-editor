const sendEmailService = require("../services/email.services");

const sendEmailController = async (req, res) => {
  const _res = await sendEmailService(req.body);
  return res
    .status(_res.status)
    .json({ error: _res.error, data: [], message: _res.message });
};
module.exports = sendEmailController;
