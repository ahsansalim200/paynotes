require('./models/LoginData');
require('./models/NotesData');
const app = require('./app');
const mongoose = require('mongoose');


let db = mongoose.connect('mongodb+srv://testuser:testpassword@cluster0-agjg7.mongodb.net/paynotesdb?retryWrites=true', {useNewUrlParser: true}, function(err){
    console.log(err);
});
console.log(db);
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Express is running on port ${server.address().port}`);
});