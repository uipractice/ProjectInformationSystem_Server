const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config();
let ClientInfo = require('./models/clientInfo.model');

const log = console.log;
const clientInfoRouter = require('./routes/clientInfo');
const authenticationRouter=require('./routes/auth.routes')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Succss');
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploadDoc');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '--' + file.originalname);
//   },
// });



// const upload = multer({ storage: fileStorageEngine });

// app.post('/multipleOld/:id', upload.array('fileName', 50), (req, res) => {
//   const files = req.files || [];
//   log('1 FileName : ', req.files[0].originalname);
//   log('2 Date + FileName : ', req.files[0].filename);
//   log('3 Path + Date + FileName : ', req.files[0].path);
//   ClientInfo.findById(req.params.id)
//     .then((clientInfo) => {
//       clientInfo.fileName = req.files[0].filename;
//       clientInfo.pathName = req.files[0].path;
//       clientInfo
//         .save()
//         .then(() => {
//           res.json('Files Upload is Successful and File path saved to DB');
//           log(res.data);
//         })
//         .catch((err) => res.status(400).json('Error: ' + err));
//     })
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

app.post('/multiple/:id', upload.array('fileName', 50), (req, res) => {
  const files = req.files || [];
  ClientInfo.findById(req.params.id).then((client) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: process.env.S3_BUCKET,
      CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: 'ap-south-1',
      },
    };

    const uploadedFiles = [];
    for (let file of files) {
      log('1 FileName : ', file.originalname);
      const fileNameArray = file.originalname.split('.');
      // Params for file Upload
      params.Body = file.buffer;
      params.Key = `${req.params.id}_${fileNameArray[0]}.${fileNameArray[1]}`;
      params.ContentType = file.mimetype;
      params.ContentDisposition = `attachment; filename=${file.originalname}`;
      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          res.status(400).json('File upload failed Error: ' + err);
          throw err;
        }
        console.log(`File uploaded successfully.`, data);
        uploadedFiles.push(`${data.Key}`);
        if (uploadedFiles.length === files.length) {
          // Update the Db with the uploaded filenames
          client.uploadedFiles = uploadedFiles;
          client
            .save()
            .then(() => {
              res.json('File Upload Successful and saved to DB');
            })
            .catch((err) => res.status(400).json('Error: ' + err));
        }
      });
    }
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
mongoose.connection.once('open', () => log('MongoDB Connection is successful'));

app.use('/clientInfo', clientInfoRouter);
app.use('/auth',authenticationRouter)
