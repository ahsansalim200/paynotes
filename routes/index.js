const express = require('express');

const router = express.Router();
const path = require('path');

const mongoose = require('mongoose');
const LoginData = mongoose.model('paynotescollection');
const NoteData = mongoose.model('savednote');


router.get('/', (req, res) => {
    res.render('login.html');
});

router.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    LoginData.find({username: req.body.username, password:req.body.password})
        .then(
            (loginData) => {
                console.log(loginData);
                if(loginData.length > 0) {
                    res.render('notes.html',{loggedInUser: req.body.username});
                } else {
                    res.render('login.html', {error: 'Invalid credentials'});
                }

            })

});

router.post('/getnotes', (req, res) => {
    NoteData.find({user: req.body.user})
        .then(
            (noteData) => {
                console.log(noteData);
                res.send(noteData);
            })
});

router.post('/savenotes', (req, res) => {

    //const noteData = new NoteData(req.body);
    console.log(req.body);
    NoteData.findOneAndUpdate({user: req.body.user}, {$set:{note:req.body.note}}, {upsert:true}, function(err, doc){
        if (err) return res.send('Failure');
        return res.send("Success");
    });
});

module.exports = router;