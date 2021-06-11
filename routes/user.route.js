const bcrypt = require('bcrypt');
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

  let userSchema = require('../models/User');

  
  //CREATE
  router.route('/create-user').post((req, res, next) => {
    console.log("hit")
    
    userSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(data)
        console.log(error)
        res.json({err,
        msg:"Bad Login"})
        return next(error)
      } else {
        const passwordHash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        data.password=passwordHash;
        data.save();
        console.log(data)
        res.json(data)
      }
    })
  });

  //LOGIN
  router.route('/log-user').post((req, res, next) => {

    userSchema.findOne({email: req.body.email},(error, data)=>{
    if(error){
      return next(error)
    }else{

        const user = data;

        if(bcrypt.compareSync(req.body.password, user.password)){

          user.password="no peeking"
          
          res.json({
            user,
            success: user? true : false,
            msg:"Success!"
          })
        }else{
          res.json({
            msg:"Bad login"})
        }
        
      }
    })
  })

  //DELETE
  router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  //READ
router.route('/').get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

  module.exports = router;