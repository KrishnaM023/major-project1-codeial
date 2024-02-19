const express = require('express');
const app = express();
const port = 8000;

// Layouts
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

// Extract Style and Scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

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