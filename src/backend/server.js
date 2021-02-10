//nodemon -r dotenv/config server.js

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

const port = process.env.PORT || 5001;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));
mongoose.set('useCreateIndex', true);
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established");
});

app.use('/albums', albumsRouter,);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/ratings', ratingsRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});