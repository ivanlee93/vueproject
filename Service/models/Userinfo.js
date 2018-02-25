var mongoose = require("mongoose");

module.exports = mongoose.model("Userinfo", {
    'id': String,
    'name': String,
    'sex': String,
    'birthdate': String,
    'mobile': String,
    'email': String,
    'provicen': String,
    'political': String,
    'nation': String,
    'nativeplace': String,
    'position': String,
    'competent': String,
    'department': String,
    'jobid': String,
    'education': String,
    'school': String,
    'major': String,
    'entry': String,
    'become': String,
    'contractstart': String,
    'contractend': String,
    'identity': String,
    'employ': String,
    'marital': String
});
 
