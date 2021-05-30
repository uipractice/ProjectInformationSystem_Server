const router = require('express').Router()
let ClientInfo = require('../models/clientInfo.model')
 
router.route('/').get(
    (req, res) => {
        ClientInfo.find()
            .then(clientInfo=> res.json(clientInfo))
            .catch(err => res.status(400).json('Error: ' + err))
    }
)

router.route('/add').post(
    (req, res) => {
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
        const isIsolatedEnvReq = req.body.isIsolatedEnvReq;
        const isolationDetails = req.body.isolationDetails;
        const isDLPreq = req.body.isDLPreq;
        const isClientEmailProvided = req.body.isClientEmailProvided;

        const newClientInfo = new ClientInfo ({
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
            isIsolatedEnvReq,
            isolationDetails,
            isDLPreq,
            isClientEmailProvided

        });

        newClientInfo.save()
            .then(() => res.json('ClientInfo added!'))
            .catch(err => res.status(400).json('Error: ' + err))

    }
)

module.exports = router
