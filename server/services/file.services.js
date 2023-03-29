const FileModel = require("../models");

const insertFilesService = async (payload) => {
  try {
    const result = await FileModel.insertMany(payload);
    const data = result.map((r) => ({
      id: r._id.toString(),
      filename: r.filename,
      url: r.url,
      size: r.size,
      height: r.height,
      width: r.width,
    }));
    return { data, error: false, message: "success", status: 200 };
  } catch (error) {
    return { data: [], error: true, message: "error occurred", status: 500 };
  }
};

const getMediaFilesService = async () => {
  try {
    const result = await FileModel.find().sort({ _id: "desc" });
    const message = result.length > 0 ? "Success" : "Data not found";
    const error = result.length > 0 ? false : true;
    const status = result.length > 0 ? 200 : 404;
    const data = result.map((r) => ({
      id: r._id.toString(),
      filename: r.filename,
      url: r.url,
      size: r.size,
      height: r.height,
      width: r.width,
    }));
    return { message, error, data, status };
  } catch (error) {
    return { message: "error occurred", error: true, data: [], status: 500 };
  }
};

module.exports = {
  insertFilesService,
  getMediaFilesService,
};
