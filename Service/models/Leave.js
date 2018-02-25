var mongoose = require("mongoose");

module.exports = mongoose.model("Leaves", {
    'jobid': String,
    'name': String,
    'leavetype': String,
    'starttime' : String,
    'endtime' : String,
    'totaltime' : String,
    'leavereason': String
});