const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clientInfoSchema = new Schema(
    {
        projectNameByIT: { type: String },
        projectManager: { type: String },
        email: { type: String },
        practice: { type: String },
        status: { type: String },
        projectName: { type: String },
        securityMeasure: { type: String },
        informIT: { type: String},
        workStationSelected: { type: String },
        devTypeSelected: { type: String },
        allowedWebsite: { type: String},
        isNDAsigned: { type: String},
        isGDPRcompliance: { type: String },
        isCyberSecConducted: { type: String },
        securityBreach: { type: String },
        isDisasterInsuCovered: { type: String},
            disasterDetails: { type: String },
            showInsuranceDetails: { type: String },
        isIsolatedEnvReq: { type: String }, 
            isolationDetails: { type: String },
            showIsolatedDetails: { type: String },
        isDLPreq: { type: String },
        isClientEmailProvided: { type: String },
        deleteReason: { type: String },
        restoreReason: { type: String },
        reshareReason: { type: String },
        fileName: { type: String },
        pathName: { type: String },
    }, 
    
    {  timestamps: true }
);

const ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);
module.exports = ClientInfo; 