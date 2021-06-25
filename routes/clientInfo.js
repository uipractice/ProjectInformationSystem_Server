const router = require("express").Router();
let ClientInfo = require("../models/clientInfo.model");
const log = console.log;

const { sendEmail } = require("../mail");

router.route("/email").post((req, res) => {
  const projectNameByIT = req.body.projectNameByIT;
  const projectManager = req.body.projectManager;
  const email = req.body.email;
  const practice = req.body.practice;
  const status = req.body.status;

  const projectName = "";
  const securityMeasure = "";
  const informIT = "";
  const workStationSelected = "";
  const devTypeSelected = "";
  const allowedWebsite = "";
  const isNDAsigned = "";
  const isGDPRcompliance = "";
  const isCyberSecConducted = "";
  const securityBreach = "";
  const isDisasterInsuCovered = "";
  const disasterDetails = "";
  const showInsuranceDetails = "";
  const isIsolatedEnvReq = "";
  const isolationDetails = "";
  const showIsolatedDetails = "";
  const isDLPreq = "";
  const isClientEmailProvided = "";

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
    .then((row) => {   
      res.json("success");  
      sendEmail(
        email,
        projectManager,
        projectNameByIT,
        // req.body.message,
        row._id
      );
      log("Form saved to mongo with the ID : ", row._id);
    })
    .catch((err) => {
      res.json({
        status: "fail",
      });
      log("Error in saving the form to mongodb : ", err)
    });
    
});

router.route("/").get((req, res) => {
  ClientInfo.find()
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

router.route("/:id").delete((req, res) => {
  ClientInfo.findByIdAndDelete(req.params.id)
    .then(() => res.json("ClientInfo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
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
        .then(() => res.json("ClientInfo updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").post((req, res) => {
  ClientInfo.findById(req.params.id)
    .then((clientInfo) => {
      clientInfo.status = req.body.status;
      clientInfo
        .save()
        .then(() => res.json("ClientInfo status updated to Deleted!"))
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

module.exports = router;
