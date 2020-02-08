const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const queryString = require('query-string');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(process.env.MAGIC)
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
app.post('/query', async (request, response) => {
    console.log('I got a request!');
    // console.log(request);
    data = request.body;
    console.log(data);
    // const url = new URL('http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid');
    const url = 'http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid'
    // url.search = new URLSearchParams(data).toString();
    const options = {
        method: 'POST',
        headers: {
            "Host": "cos1.ntnu.edu.tw",
            "Connection": "keep-alive",
            "Content-Length": JSON.stringify(data).length.toString(),
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Origin": "http://cos1.ntnu.edu.tw",
            "Referer": "http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=query",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
            // "Cookie": 'JSESSIONID=lRphp27V0ym260yprwhYJXvZqp7vyzlrysypTrsPHj2ylHpKzwdz!407899233'
            "Cookie": `JSESSIONID=${process.env.MAGIC}`
            
        },
        body: queryString.stringify(data)
    };
    try {
        const fetch_response = await fetch(url, options);
        fetch_response.type = 'basic'
        const rr = await fetch_response.json();
        console.log(fetch_response.text)
        console.log('rr', rr)
        response.json(rr['List']);
    } catch (error) {
        console.log(error)
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