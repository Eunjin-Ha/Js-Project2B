// Import mongoose
const mongoose = require('mongoose');

// Define what you want your data to look like
const projectsSchemaDefinition = {
    title:{ //movie title
        type: String, 
        required: true
    },
    author:{ //writer
        type: String, 
        required: true
    },
    genre: { // genre
        type: String, 
        default: 'None'
    },
    rate: { // user rate of movies
        type: Number,
        default: 0
    },
    createDate: { // create date
        type: Date
    },
    comments: {
        type: String,
        default: '-'
    }
}
// Create a mongoose schema using the definition object
const projectsSchema = new mongoose.Schema(projectsSchemaDefinition);
// Create a mongoose model using the mongoose schema
module.exports = mongoose.model('movie_archive', projectsSchema);