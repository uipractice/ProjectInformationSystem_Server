const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clientInfoSchema = new Schema(
    {
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
        isIsolatedEnvReq: { type: String }, 
            isolationDetails: { type: String },
        isDLPreq: { type: String },
        isClientEmailProvided: { type: String }
    }, 
    
    {  timestamps: true }
);

const ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);
module.exports = ClientInfo; 