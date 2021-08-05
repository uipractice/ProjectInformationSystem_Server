const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();
let ClientInfo = require("./models/clientInfo.model");

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

app.post("/multiple/:id", upload.array("fileName", 50), (req, res) => {
  log("1 FileName : ", req.files[0].originalname); 
  log("2 Date + FileName : ", req.files[0].filename); 
  log("3 Path + Date + FileName : ", req.files[0].path); 
  res.send("Files Upload is Successful"); 

  ClientInfo.findById(req.params.id)
  .then((clientInfo) => {
    clientInfo.fileName = req.files[0].filename;
    clientInfo.pathName = req.files[0].path;
    clientInfo
      .save()
      .then(() => {
        res.json("File path saved to DB")
        log(res.data)
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));

});

app.get('/uploadDoc/:id', async(req, resp) => {
  ClientInfo.findById(req.params.id)
  
  .then((clientInfo) => {
    clientInfo.fileName = req.files[0].filename;
    clientInfo.pathName = req.files[0].path;
    clientInfo
      .save()
      .then(() => {
        res.json("File path saved to DB")
        log(res.data)
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));

    let filePath = path.resolve(`./job_files/${authorized.rows[0].job_id}/${authorized.rows[0].milestone_id}/${downloadFile.rows[0].filename}`);
    resp.download(filePath, downloadFile.rows[0].filename, (err) => {
        if (err) console.log(err);
    });

});

// app.get("/download", function(req, res){
//   res.download('./uploadDoc/1626894517317--Habbits.txt', '1626894517317--Habbits.txt');
// });

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
