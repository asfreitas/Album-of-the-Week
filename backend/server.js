//nodemon -r dotenv/config server.js
const path = require('path');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const albumsRouter = require('./routes/albums')
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const ratingsRouter = require('./routes/ratings');
const bodyParser= require('body-parser');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 80

app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/backend/album', albumsRouter);
app.use('/backend/users', usersRouter);
app.use('/backend/addNew', searchRouter);
app.use('/backend/ratings', ratingsRouter);
//app.use(express.static(path.join(__dirname, "build")));
mongoose.set('useCreateIndex', true);
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databases connection established");
});

console.log(path.join(__dirname,'build'));
/*
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});