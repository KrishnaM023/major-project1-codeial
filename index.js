const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(express.urlencoded());

// Setting up Cookie
app.use(cookieParser());

// Layouts
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract Style and Scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Use express router
app.use('/', require('./routes'));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});