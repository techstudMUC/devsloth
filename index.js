

const request = require('request');
const express = require('express');
const path = require('path');
const fs=require("fs");
var pictureUploaded = 0;
var slothiness;

var app = express();
app.use(express.static(path.join(__dirname, 'unsloth-dist', 'css')));
app.use(express.static(path.join(__dirname, 'unsloth-dist', 'fonts')));
app.use(express.static(path.join(__dirname, 'unsloth-dist', 'img')));
app.use(express.static(path.join(__dirname, 'unsloth-dist', 'js')));
app.use(express.static(path.join(__dirname, 'unsloth-dist')));



// Replace <Subscription Key> with your valid subscription key.

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
};




app.post('/evaluateFace', function(req, res) {
    const options = {
        uri: uriBase,
        qs: params,
        body: req,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : '177059b8a0e7408c9f8f291210915e6f'
        }
    };
    request.post(options, (error, response, body) => {
        if (error) {

            console.log('Error: ', error);
            return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        if (jsonResponse.includes("error")) {
            pictureUploaded = -1;
        }
        else {
            pictureUploaded = 1;
        }
        jsonObject = JSON.parse(body);
        emotions = jsonObject[0].faceAttributes;
        userData ={"slothiness" :{"text":"Potential", "className":"c-btn--warning"},
            "Tasks": {"1":{"prioClass": "c-task--danger", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "01.01.2019"},
            "2":{"prioClass": "c-task--success", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "02.01.2019"},
            "3": {"prioClass": "c-task--success", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "03.01.2019"},
            "4": {"prioClass": "c-task--success", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "04.01.2019"},
            "5": {"prioClass": "c-task--success", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "05.01.2019"},
            "6": {"prioClass": "c-task--success", "caption": "Monetisation (Share revenue with developers)", "type": "Übungsblatt", "date": "06.01.2019"}}};
        console.log(JSON.stringify(emotions));
        res.send();
    });

});


app.get('/getUserData', function(req, res){

res.json(userData);

});

app.get('/', function(req,res) {

    // if (pictureUploaded > 0) {
    //     filePath = __dirname + '/unsloth-dist/interface.html';
    //     res.sendFile(filePath);
    // }
    // else {
    //     filePath = __dirname + '/unsloth-dist/start.html';
    //     res.sendFile(filePath);
    // }
    res.sendFile(__dirname + '/unsloth-dist/start.html');

});


app.listen(process.env.PORT || 1337);