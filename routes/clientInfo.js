const router = require("express").Router();
let ClientInfo = require("../models/clientInfo.model");
const log = console.log;

const { sendEmail } = require("../mail");
const { mailReshare } = require("../mailReshare");
const { mailReminder } = require("../mailReminder");
const { mailAndUpdate } = require("../mailAndUpdate");

router.route("/email").post((req, res) => {
  const projectNameByIT = req.body.projectNameByIT;
  const projectManager = req.body.projectManager;
  const email = req.body.email;
  const practice = req.body.practice;
  const status = req.body.status;
  const deleteReason = "";
  const restoreReason = "";
  const reshareReason = "";

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
      res.json("success");  
      sendEmail(
        email,
        projectManager,
        projectNameByIT,
        // req.body.message,
        row._id
      );
      // log("Form saved to mongo with the ID : ", row._id);
    })
    .catch((err) => {
      res.json({
        status: "fail",
      });
      log("Error in saving the form to mongodb : ", err)
    });
    
});

router.route("/mailReshare/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;  //pending
      // clientInfo.email = req.body.email; 
      clientInfo.reshareReason = req.body.reshareReason;  //display in the email
      log(req.body.email);
      clientInfo
        .save()
        .then((savedDocument) => {
          res.json("Project is Reshared & Status is updated to Pending!");
          mailReshare( 
                    savedDocument.email,
                    savedDocument.projectManager,
                    savedDocument.projectNameByIT,
                    savedDocument.reshareReason,
                    // req.body.message,
                    savedDocument._id
                  );
        })
        .catch((err) => res.status(400).json("Error dp: " + err));
    })
    .catch((err) => res.status(400).json("Error dp2: " + err));
    
});

router.route("/mailReminder/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      log(req.body.email);
      clientInfo
        .save()
        .then((savedDocument) => {
          res.json("Sending reminder mail !");
          mailReminder(
                    savedDocument.email,
                    savedDocument.projectManager,
                    savedDocument.projectNameByIT,
                    savedDocument._id
                  );
        })
        .catch((err) => res.status(400).json("Error dp: " + err));
    })
    .catch((err) => res.status(400).json("Error dp2: " + err));
    
});

router.route("/mailAndUpdate/:id").post((req, res) => {
  ClientInfo.findByIdAndUpdate(req.params.id)
    .then((clientInfo) => {
      clientInfo.projectNameByIT = req.body.projectName; 
      clientInfo.status = req.body.newStatus; 
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
          res.json("Informing IT team that clientInfo is updated!");
          //import email method call
          mailAndUpdate(
                    savedDocument.email,
                    savedDocument.projectManager,
                    savedDocument.projectNameByIT,
                    savedDocument._id
                  );
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/editAndUpdate/:id").post((req, res) => {
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
          log("Successfully edited and updated the values..!" + res);
        })
        .catch((err) => res.status(400).json("Error in saving EditAndUpdate API : " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  ClientInfo.find().sort({
    createdAt: -1,
  })
    .then((clientInfo) => res.json(clientInfo))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const projectNameByIT = req.body.projectNameByIT;
  const projectManager = req.body.projectManager;
  const email = req.body.email;
  const practice = req.body.practice;
  const status = req.body.status;

  const projectName = req.body.projectName;
  const securityMeasure = req.body.securityMeasure;
  const informIT = req.body.informIT;
  const workStationSelected = req.body.workStationSelected;
  const devTypeSelected = req.body.devTypeSelected;
  const allowedWebsite = req.body.allowedWebsite;
  const isNDAsigned = req.body.isNDAsigned;
  const isGDPRcompliance = req.body.isGDPRcompliance;
  const isCyberSecConducted = req.body.isCyberSecConducted;
  const securityBreach = req.body.securityBreach;
  const isDisasterInsuCovered = req.body.isDisasterInsuCovered;
  const disasterDetails = req.body.disasterDetails;
  const showInsuranceDetails = req.body.showInsuranceDetails;
  const isIsolatedEnvReq = req.body.isIsolatedEnvReq;
  const isolationDetails = req.body.isolationDetails;
  const showIsolatedDetails = req.body.showIsolatedDetails;
  const isDLPreq = req.body.isDLPreq;
  const isClientEmailProvided = req.body.isClientEmailProvided;

  const newClientInfo = new ClientInfo({
    projectNameByIT,
    projectManager,
    email,
    practice,
    status,

    projectName,
    securityMeasure,
    informIT,
    workStationSelected,
    devTypeSelected,
    allowedWebsite,
    isNDAsigned,
    isGDPRcompliance,
    isCyberSecConducted,
    securityBreach,
    isDisasterInsuCovered,
    disasterDetails,
    showInsuranceDetails,
    isIsolatedEnvReq,
    isolationDetails,
    showIsolatedDetails,
    isDLPreq,
    isClientEmailProvided,
  });

  newClientInfo
    .save()
    .then(() => res.json("ClientInfo added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => res.json(clientInfo))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/deleteStatus/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.deleteReason = req.body.deleteReason;
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json("Status is updated to Deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/restoreProject/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json("Status is updated to Submitted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/approvStatus/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json("Status is updated to Approved!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/submit/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json("ClientInfo Status updated to Submitted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

{
// router.route("/:id").delete((req, res) => {
//   ClientInfo.findByIdAndDelete(req.params.id)
//     .then(() => res.json("ClientInfo deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// We can create multiple routes for filter option.
// router.route("/").get((req, res) => {
//   ClientInfo.find().sort({
//     createdAt: -1,
//   })
//     .then((clientInfo) => res.json(clientInfo))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
}

module.exports = router;
