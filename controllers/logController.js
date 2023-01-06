//forms link between models(data structure for interacting with db) and views(html pages visable to user)
//use model to get data then pass that data into a view
//view renders data into template and sends it the browser


const Log = require('../models/log');   //individual structure for a log instance
const mongoose = require('mongoose'); 

//get all logs from db, order them into table at /report view.
const log_report = (req, res) => {
    Log.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('report', {logs: result})
    })
    .catch((err) => {
        res.status(404).render('404', { title: 'log not found'});
    })
}

//get individual details for a specified log
const log_details = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());      //trim is used as an error was passed due to length of id field
    Log.findById(id)
        .then(result => {
            res.render('logs/details', { log: result, title:'Log Details'})
        })
        .catch(err => {
            res.status(404).render('404', { title: 'log not found'});
        })
}


//renders create page
const log_create_get = (req, res) => {
    res.render('logs/create'); 
}

// takes new data from create page and creates a new log instance with its body parameters
const log_create_post = (req, res) => {
    const log = new Log(req.body);

    log.save()
        .then((result) => {
            res.redirect('/report');
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'log not found'});
        })
}


//get log associated with id and render the modify page.
const log_modify_get = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    Log.findById(id)
        .then((result) => {
            res.render('logs/modify', { log: result, title:'Modify Log Details'})
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'log not found'});
        })
}

const log_modify_put = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    // set the parameters to be changed 
    UserParams = 
    {
        education: req.body.education,
        shopping: req.body.shopping,
        browsing: req.body.browsing,
        social: req.body.social 
    };
    // find the id of the log be changed and set the updated details with $set
    Log.findByIdAndUpdate(id, {$set: UserParams})
        .then((result) => {
            res.redirect('/report');
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'log not found'});
        })
} 

//finds the individual id of a log and deletes it from db
const log_delete = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());  
    Log.findByIdAndDelete(id)   
        .then((result) => {
            res.json({ redirect: '/report' });  //cannot send redirect, must be done on frontend send json back to details
        })
        .catch(err => {
            res.status(404).render('404', { title: 'log not found'});
        })
}



module.exports = {
    log_report,
    log_details,
    log_create_get,
    log_create_post,
    log_modify_get,
    log_modify_put,
    log_delete
}