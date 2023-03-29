const express = require("express");
const {
  insertFilesController,
  getMediaFilesController,
} = require("../controllers/file.controllers");
const formatUploadedFiles = require("../middlewares/formatFile.middleware");
const multerFireStorage = require("../middlewares/firestorage.middleware");

const route = express.Router();

route.post(
  "/uploadFiles",
  multerFireStorage.array("mediaFile", 4),
  formatUploadedFiles,
  insertFilesController
);

route.get("/getFiles", getMediaFilesController);

module.exports = route;
