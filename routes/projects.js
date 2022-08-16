// Import express and create a router object
const express = require('express');
const router = express.Router();
// Import your model
const Project = require('../models/project'); 
const User = require('../models/user');

// Configure the router object by adding request handlers
// GET handler for '/Projects/' << remember routes are relative to the path declared in app.js
router.get('/', (req, res, next) => {
    Project.find((err, projects)=>{
        if (err) { console.log(err); }
        else {
            res.render('projects/index', {
                title: 'Movie Archive',
                dataset: projects
            })
        }
    });
});

// GET handler for /Projects/Add
router.get('/add_movies', (req, res, next) => {
    res.render('projects/add_movies', { title: 'Tell me your movies' });
});


// POST handler for /Projects/Add
// recieved when user clicks SAVE button inside the form
router.post('/add_movies', (req, res, next) => {
    Project.create(
        {
            title: req.body.title, // << extract info from request body <form> > input field with id name
            author: req.body.author,
            genre: req.body.genre,
            rate: req.body.rate,
            createDate: req.body.createDate,
            comments: req.body.comments
        },
        (err, newProject) => {
            if (err) { console.log(err); } // error
            else { res.redirect('/projects'); } // success
        });
});

// GET handler for 
router.get('/delete/:_id', (req, res, next) =>{
    Project.remove({
        _id: req.params._id
    }, 
    (err) => {
        if (err) {console.log(err);}
        else {
            res.redirect('/projects');
        }
    })
});

// GET handler for /Projects/Edit/_id
router.get('/edit_movies/:_id', (req, res, next) =>{
    Project.findById(req.params._id, (err, project)=>{
        if (err) { console.log(err);}
        else {
            Project.find((err, projects) => {
                if(err) { console.log(err);
                    console.log(project);
                }
                else {
                    res.render('projects/edit_movies', 
                    {
                        title: project.title, 
                        project: project
                        // author: project.author,
                        // genre: project.genre,
                        // rate: project,
                        // createDate: project.createDate,
                        // comments: project.comments
                    });
                }
            }).sort({name: 1});
        }
    });
});

// POST handler for /Projects/Edit/:_id
router.post('/edit_movies/:_id', (req, res, next) => {
    Project.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            title: req.body.title, 
            author: req.body.author,
            genre: req.body.genre,
            rate: req.body.rate,
            createDate: req.body.createDate,
            comments: req.body.comments
        },
        (err, updatedProject) => {
            if (err) { console.log(err);}
            else {
                res.redirect('/projects');
            }
        }
    );
});

// Export the router object
module.exports = router;
