const express = require('express');
const app = express();
const path =require('path');

require('dotenv').config();
const cors = require('cors');


// Enable CORS for cross-origin requests
app.use(cors());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(__dirname+"/views/index.html");
});

  
//middleware to handle JSON requets
app.use(express.json());

// Route to handle the /api/whoami request
app.get('/api/whoami', (req, res) => {

    // Getting the IP address from the request
    const ipaddress = req.ip || req.headers['x-forwarded-for'] || req.remoteAddress;

    // Getting the language from the 'Accept-Language' header
    const language = req.headers['accept-language'] || "Unknown";

    // Getting the user-agent from the 'User-Agent' header
    const software = req.headers['user-agent'] || "Unknown";

    // Respond with a JSON object
    res.json({
         ipaddress: ipaddress,
         language: language,
         software: software 
    });
});


// Set the port for the application
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
