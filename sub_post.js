var express = require('express')
var router = express.Router();
var request = require('request');
const mqtt = require('mqtt');
const crypto = require('crypto');
var client = mqtt.connect('mqtt://localhost:1883');
//var db_sensor = require('../mongoose/database');
let message;
var key="key"

var connectCallback = function () {
    console.log('mqtt broker connected')
    client.subscribe('question2')
}


client.on('message', function (topic, message) {   
    
    // console.log(message);
    msg=message.toString();
    // console.log(msg);
    var denc=crypto.createDecipher('aes-256-ctr',key).update(msg,'hex','utf-8')
    obj=JSON.parse(denc);
    let DATA = {
        sensor: obj.sensor,
        temperature: obj.temperature,
        humidity: obj.humidity,
        user_id: obj.user_id
    }
    console.log("received data:-");
    console.log(DATA);
    var options = {
        uri: "http://localhost:3000/sensor",
        headers: {

            "Content-Type": "application/json"
        },
        body: JSON.stringify(DATA)

    };
    //console.log(options.body);

    request.post(options, (err, res, body) => {
        console.log(body);
    });
})
client.on('connect', connectCallback)
module.exports = router;