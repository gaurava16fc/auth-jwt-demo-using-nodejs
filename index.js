const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Imports Routes here...
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB...
mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('Connected to database...')
    );

// MIDDLEWARES...
app.use(express.json());


// Route Middlewares...
app.use('/api/users', authRoute);
app.use('/api/posts', postRoute);


// Server is going to Listen on given Port...
app.listen(portNumber, () => console.log("Server is up and running at port number# " + portNumber));