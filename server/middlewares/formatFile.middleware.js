const formatUploadedFiles = async (req, res, next) => {
  const files = req.files;
  const body = JSON.parse(JSON.stringify(req.body));
  if (files) {
    const formattedFiles = files.map((file, i) => {
      const info = JSON.parse(body[`info_${i}`]);
      return {
        url: file.publicUrl,
        size: file.fileRef.metadata.size,
        filename: file.fileRef.metadata.name,
        height: info.height | 300,
        width: info.width | 500,
      };
    });
    req.mediaFiles = formattedFiles;
    next();
  } else {
    res.status(400).json({ message: "Error occurred, try again" });
  }
};
module.exports = formatUploadedFiles;
