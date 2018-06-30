const mqtt = require('mqtt');
const crypto = require('crypto')
// var client = mqtt.connect('mqtt://bhau@35.200.143.233:1883');
var client = mqtt.connect('mqtt://broker.hivemq.com:1883')
const arr = ["Engine1", "Engine2", "Silensor", "Exaust", "Inner"]
var interval_time = 1
var it = 1;
var interval = -1;
key="key"

function sentData() {
    let data = {
        sensor: arr[Math.floor((Math.random() * 5).toFixed(2))],
        temperature: (Math.random() * 100).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2),
        user_id: 9595008068
    }

    console.log('sent data:-')
    console.log(data);
    var enc=crypto.createCipher('aes-256-ctr',key).update(JSON.stringify(data),'utf-8','hex')
    console.log("Sent encrpyted data "+ enc);
    client.publish('question2', enc)
    
}
var connectCallback = function () {
    console.log('mqtt broker connected')
    client.subscribe('interval')
    interval = setInterval(sentData, 1000 * it)
    // clearInterval(interval);
}
client.on('message', (topic, int) => {
    console.log('new Interval time received');
    interval_time = parseInt(int, 10)
    clearInterval(interval);
    interval = setInterval(sentData, 1000 * interval_time)
    //console.log(typeof (interval_time) + interval_time);

})

client.on('connect', connectCallback)