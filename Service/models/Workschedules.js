var mongoose = require("mongoose");

module.exports = mongoose.model("Workschedules", {
    'id': String,
    'start' : String,
    'end' : String,
    'title' : String
});
