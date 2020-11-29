const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established");
});
const albumsRouter = require('./routes/albums')
const usersRouter = require('./routes/users');

app.use('/albums', albumsRouter);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});