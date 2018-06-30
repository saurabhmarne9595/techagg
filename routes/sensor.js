var express = require('express');
var router = express.Router();
var db_sensor = require('../mongoose/database');
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', function () {
    console.log('mqtt broker connected')

})

router.get('/interval', (req, res) => {
    arr = req.url.split('=')
    //console.log(typeof(arr[1]));

    //console.log("arr:- <" + arr[1] + ">");
    res.send("changing interval to " + arr[1] + " seconds");
    client.publish('interval', arr[1])


})


router.post("/mydata", (req, res) => {
    // console.log(req.body);
    // console.log("in post");
    if (!req.body.mob_no)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        db_sensor.finduserbyid( req.body.mob_no, (err,sensdata) => {            
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else{
                //console.log("added");
                res.json({
                    success: true,
                    msg: sensdata
                })

            }
                
        })
    }
})



router.post("/", (req, res) => {
    // console.log(req.body);
    // console.log("in post");
    if (!req.body.sensor || !req.body.temperature || !req.body.humidity || !req.body.user_id)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        let DATA = {
            sensor: req.body.sensor,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            user_id: req.body.user_id
        }
        db_sensor.adddata(DATA, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else{
                console.log("added");
                res.json({
                    success: true,
                    msg: 'added' + DATA
                })

            }
                
        })
    }
})

module.exports = router;