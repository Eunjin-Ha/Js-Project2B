const mongoose = require('mongoose');

// but how do I handle encrypting/validation passwords?
// how do I handle serializing/deserializing this object to/from session store?
const plm = require('passport-local-mongoose');

// set user 
const schemaDefinition = {
    username: { type: String },
    password: { type: String }
}

const mongooseSchema = new mongoose.Schema(schemaDefinition);

// once I have the schema object, I can expand its functionality
mongooseSchema.plugin(plm);

//create table for user registration
module.exports = new mongoose.model('User', mongooseSchema);