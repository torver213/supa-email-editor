const {
  insertFilesService,
  getMediaFilesService,
} = require("../services/file.services");

const insertFilesController = async (req, res) => {
  const result = await insertFilesService(req.mediaFiles);
  return res.status(result.status).json(result);
};
const getMediaFilesController = async (req, res) => {
  const result = await getMediaFilesService();
  return res.status(result.status).json(result);
};
module.exports = {
  insertFilesController,
  getMediaFilesController,
};
