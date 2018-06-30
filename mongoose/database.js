const mongo = require('mongoose');
const SensorSchema = mongo.Schema({
    sensor: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
});

const UserSchema = mongo.Schema({
    user_name: {
        type: String,
        required: true
    },
    mob_no: {
        type: Number,
        required: true
    }
});

const sensor = module.exports = mongo.model('senscoll', SensorSchema);
const user = module.exports = mongo.model('usercoll', UserSchema);

module.exports.getdata = function (callback) {
    sensor.find(callback);
};

module.exports.adddata = function (DATA, callback) {
    sensor.create(DATA, callback);
};
module.exports.updatedata = function (sensor_name, callback) {
    sensor.find(sensor_name, callback)
}
module.exports.adduser = function (name, callback) {
    user.create(name, callback)
}
module.exports.finduser = function (mobile_no, callback) {
    query = {
        mob_no: mobile_no
    }
    user.findOne(query, callback)
}


module.exports.finduserbyid = function (mob_no, callback) {
    query = {
        user_id: mob_no
    }
    sensor.find(query, callback)
    //console.log(callback);

}