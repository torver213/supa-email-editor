const Multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
// replace this with path to your firebase admin sdk
const fireCert = require("../cert/email-editor-2a247-firebase-adminsdk-23p86-e4dd430074.json");
const { bucketName } = require("../config");

// change this config to match your server credentials
const multerFireStorage = Multer({
  storage: FirebaseStorage({
    bucketName,
    credentials: {
      clientEmail: fireCert.client_email,
      privateKey: fireCert.private_key,
      projectId: fireCert.project_id,
    },
    public: true,
    unique: true,
    hooks: {
      beforeInit(instance) {
        console.log(`before init:`, instance);
      },
      beforeUpload(req, file) {
        let fileEx = file.originalname.split(".")[1];
        const fileName = `SUPA_${new Date().getTime()}.${fileEx}`;
        file.filename = fileName;
        file.originalname = fileName;
      },
    },
  }),
  limits: { fieldSize: 10 * 1024 * 1024 },
});

module.exports = multerFireStorage;
