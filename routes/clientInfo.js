const router = require('express').Router();
const path = require('path');
const fs = require('fs');

let ClientInfo = require('../models/clientInfo.model');
const log = console.log;

const { shareForm } = require('../mails/shareForm'); //mail
const { reShareForm } = require('../mails/reShareForm'); //mailReshare
const { reminderMail } = require('../mails/reminderMail'); //mailReminder
const { formSubmitted } = require('../mails/formSubmitted'); //mailAndUpdate
const { feedbackMail } = require('../mails/feedbackMail');

router.route('/mailAndUpdate/:id').post((req, res) => {
  ClientInfo.findByIdAndUpdate(req.params.id)
    .then((clientInfo) => {
      clientInfo.projectNameByIT = req.body.preProjectNameByIT;
      clientInfo.status = 'Submitted';
      // clientInfo.status = "Pending";
      //above two are getting updated, below is getting added and email, practice being undisturbed.
      clientInfo.securityMeasure = req.body.securityMeasure;
      clientInfo.informIT = req.body.informIT;
      clientInfo.workStationSelected = req.body.workStationSelected;
      clientInfo.devTypeSelected = req.body.devTypeSelected;
      clientInfo.allowedWebsite = req.body.allowedWebsite;
      clientInfo.isNDAsigned = req.body.isNDAsigned;
      clientInfo.isGDPRcompliance = req.body.isGDPRcompliance;
      clientInfo.isCyberSecConducted = req.body.isCyberSecConducted;
      clientInfo.securityBreach = req.body.securityBreach;
      clientInfo.isDisasterInsuCovered = req.body.isDisasterInsuCovered;
      clientInfo.disasterDetails = req.body.disasterDetails;
      clientInfo.showInsuranceDetails = req.body.showInsuranceDetails;
      clientInfo.isIsolatedEnvReq = req.body.isIsolatedEnvReq;
      clientInfo.isolationDetails = req.body.isolationDetails;
      clientInfo.showIsolatedDetails = req.body.showIsolatedDetails;
      clientInfo.isDLPreq = req.body.isDLPreq;
      clientInfo.isClientEmailProvided = req.body.isClientEmailProvided;

      clientInfo
        .save()
        .then((savedDocument) => {
          res.json('formSubmitted email');
          // log("req body : ", req.body)
          // formSubmitted(
          //           savedDocument.email,
          //           savedDocument.projectManager,
          //           savedDocument.projectNameByIT,
          //           savedDocument._id
          //   );
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  ClientInfo.find()
    .sort({
      createdAt: -1,
    })
    .then((clientInfo) => res.json(clientInfo))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/download/:id').get((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      const filePath = path.join(path.dirname(__dirname), clientInfo.pathName);
      const fileName = path.basename(filePath);
      res.download(filePath, fileName);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/download').get((req, res) => {
//   // const filePath = `${__dirname}/../${res.pathName}`
//   //  const filePath = `${__dirname}/../uploadDoc/1626894517317--Habbits.txt`
//   const filePath = `${__dirname}/../uploadDoc/mm.pdf`;
//   res.download(filePath);
//   // res.download(__dirname + '../uploadDoc/1626894517317--Habbits.txt', '1626894517317--Habbits.txt');

//   ClientInfo.findById(req.params.id)
//     .then((clientInfo) => {
//       res.json(clientInfo.pathName);
//     })
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

router.route('/:id').get((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => res.json(clientInfo))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/deleteStatus/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.deleteReason = req.body.deleteReason;
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json('Status is updated to Deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/restoreProject/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json('Status is updated to Submitted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/approvStatus/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json('Status is updated to Approved!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/submit/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json('ClientInfo Status updated to Submitted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/email').post((req, res) => {
  const projectNameByIT = req.body.projectNameByIT;
  const projectManager = req.body.projectManager;
  const email = req.body.email;
  const practice = req.body.practice;
  const status = req.body.status;
  const deleteReason = '';
  const restoreReason = '';
  const reshareReason = '';

  const newClientInfo = new ClientInfo({
    projectNameByIT,
    projectManager,
    email,
    practice,
    status,
    deleteReason,
    restoreReason,
    reshareReason,
  });

  newClientInfo
    .save()
    .then((row) => {
      res.json('success');
      shareForm(email, projectManager, projectNameByIT, row._id);
    })
    .catch((err) => {
      res.json({
        status: 'fail',
      });
      log('Error in saving the form to mongodb : ', err);
    });
});

router.route('/mailReshare/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status; //pending
      clientInfo.reshareReason = req.body.reshareReason; //display in the email

      clientInfo
        .save()
        .then((savedDocument) => {
          res.json('Project is Reshared & Status is updated to Pending!');
          reShareForm(
            savedDocument.email,
            savedDocument.projectManager,
            savedDocument.projectNameByIT,
            savedDocument.reshareReason,
            savedDocument._id
          );
        })
        .catch((err) => res.status(400).json('Error dp: ' + err));
    })
    .catch((err) => res.status(400).json('Error dp2: ' + err));
});

router.route('/feebackMail').post((req, res) => {
  ClientInfo.findById(req.params.id)
  .then((clientInfo) => {
      feedbackMail(clientInfo);
      log('Sharing feedback mail !');
    })
    .catch((err) => res.status(400).json('Error dp: ' + err));
});

router.route('/mailReminder/:id').post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      log(req.body.email);
      clientInfo
        .save()
        .then((savedDocument) => {
          res.json('Sending reminder mail !');
          reminderMail(
            savedDocument.email,
            savedDocument.projectManager,
            savedDocument.projectNameByIT,
            savedDocument._id
          );
        })
        .catch((err) => res.status(400).json('Error dp: ' + err));
    })
    .catch((err) => res.status(400).json('Error dp2: ' + err));
});

router.route('/editAndUpdate/:id').post((req, res) => {
  ClientInfo.findByIdAndUpdate(req.params.id)
    .then((clientInfo) => {
      clientInfo.projectNameByIT = req.body.projectNameByIT;
      clientInfo.status = req.body.status;
      clientInfo.securityMeasure = req.body.securityMeasure;
      clientInfo.informIT = req.body.informIT;
      clientInfo.workStationSelected = req.body.workStationValue;
      clientInfo.devTypeSelected = req.body.devTypeValue;
      clientInfo.allowedWebsite = req.body.allowedWebsite;
      clientInfo.isNDAsigned = req.body.NDAsigned;
      clientInfo.isGDPRcompliance = req.body.GDPRcompliance;
      clientInfo.isCyberSecConducted = req.body.CyberSecConducted;
      clientInfo.securityBreach = req.body.securityBreach;
      clientInfo.isDisasterInsuCovered = req.body.DisasterInsuCovered;
      clientInfo.disasterDetails = req.body.disasterDetails;
      clientInfo.showInsuranceDetails = req.body.showInsuranceDetails;
      clientInfo.isIsolatedEnvReq = req.body.IsolatedEnvReq;
      clientInfo.isolationDetails = req.body.isolationDetails;
      clientInfo.showIsolatedDetails = req.body.showIsolatedDetails;
      clientInfo.isDLPreq = req.body.DLPreq;
      clientInfo.isClientEmailProvided = req.body.ClientEmailProvided;

      clientInfo
        .save()
        .then((res) => {
          log('successfully Edited');
        })
        .catch((err) =>
          res.status(400).json('Error in saving EditAndUpdate API : ' + err)
        );
    })
    .catch((err) => res.status(400).json('Backend error: ' + err));
});

module.exports = router;
