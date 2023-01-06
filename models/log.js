//describes data structure for mongoose document, used to interact with db.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    education: {
        type: Number,
        required: true
    },
    shopping: {
        type: Number,
        required: true
    },
    browsing: {
        type: Number,
        required: true
    },
    social: {
        type: Number,
        required: true
    },
    createdAt: { 
        type: Date,
        get: (date)=> date.toLocaleDateString() // set data format to DD/MM/YYYY
    }

}, {timestamps: true});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;