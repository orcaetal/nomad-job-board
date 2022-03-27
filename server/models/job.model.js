const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    datePosted: {type: Date},
    city: { type: String,},
    region: { type: String,},
    jobTitle: { type: String,},
    jobDesc: { type: String,},
    link: { type: String,},
    }, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);

