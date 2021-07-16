const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const log = console.log;
const clientInfoRouter = require("./routes/clientInfo");
 
const app = express();
app.use(cors());
app.use(express.json());
 
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadDoc");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("fileName"), (req, res) => {
  log(req.file);
  res.send("Single file upload is successful");
});

app.post("/multiple", upload.array("fileName", 50), (req, res) => {
  log(req.files);
  res.send("Multiple files upload is successful"); 
});

const port = process.env.PORT || 5000;
app.listen(port, () => log(`Server running on port: ${port}`));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => log("MongoDB Connection is successful"));


app.use("/clientInfo", clientInfoRouter);
