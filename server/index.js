require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const config = require("./config");
const mediaFileRoute = require("./routes/file.routes");
const newsletterRoute = require("./routes/email.routes");
const mongodbConnect = require("./db");

const { port, appUrl, allowedDomains } = config;

const corsConfig = (req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  return next();
};

const app = express();
//for cross origin resource sharing
app.use(cors({ origin: allowedDomains, credentials: true }));
app.use(corsConfig);
// compresses all the responses
app.use(compression());
// security
app.use(helmet());
// express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// mongo db connection
mongodbConnect();
// server static files
app.use("/static", express.static(path.join(__dirname, "public")));
// require all routes
app.use("/api", newsletterRoute);
// media files upload
app.use("/api", mediaFileRoute);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
