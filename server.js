const express = require('express');
const app = express();
require('dotenv').config();

// Set the port for the application
const PORT = process.env.PORT || 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/views/index.html");
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
  });

  
//middleware to handle JSON requets
app.use(express.json());

// Route to handle the /api/whoami request
app.get('/api/whoami', (req, res) => {

    // Getting the IP address from the request
    const ipaddress = req.ip || req.headers['x-forwarded-for'] || req.remoteAddress;

    // Getting the language from the 'Accept-Language' header
    const language = req.headers['accept-language'].split(',')[0];

    // Getting the user-agent from the 'User-Agent' header
    const software = req.headers['user-agent'];

    // Respond with a JSON object
    res.json({
         ipaddress,
         language,
         software 
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
