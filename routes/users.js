var express = require('express');
var router = express.Router();
var db_user = require('../mongoose/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/adduser", (req, res) => {
  // console.log(req.body);
  // console.log("in post");
  if (!req.body.user_name || !req.body.mob_no)
    res.json({
      success: false,
      msg: 'incomplete data'
    });
  else
    db_user.finduser(req.body.mob_no, (err, rec) => {
      //console.log(res);
      if (rec)
        res.json({
          success: false,
          msg: "user already exist"
        })
      else {
        console.log("in else");
        let DATA = {
          user_name: req.body.user_name,
          mob_no: req.body.mob_no
        }
        db_user.adduser(DATA, (err, rec) => {
          if (err)
            res.json({
              success: false,
              msg: err
            })
          else{
            console.log("added");
            res.json({
              success:true,
              msg:"added"
            })
          }
          
        })
      }
    })

})
module.exports = router;