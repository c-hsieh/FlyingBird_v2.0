const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls

app.get('/api/hello', (req, res) => {
    console.log("get")
    res.send('Hello');
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.post('/post', async (request, response) => {
    console.log('I got a request!');
    // console.log(request);
    data = request.body;
    const url = new URL('http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl');
    url.search = new URLSearchParams(data).toString();
    
    try {
        const fetch_response = await fetch(url);
        fetch_response.type = 'basic'
        const rr = await fetch_response.json();
        response.json(rr['List']);
    } catch (error) {
        response.json({ 'err': error })
    }

});
// catch (err) {
//     response.json({ 'err': err })

// }

// deploy
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));