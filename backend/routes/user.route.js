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
        message:"Bad Login"})
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
  router.route('/login').post((req, res, next) => {
    console.log('hit')
    if(error){
      return next(error)
    }else{
      try {
        const user = User.findOne({email: req.body.email})
        
        if(bcrypt.compareSync(req.body.password, user.password)){
          
          res.json({
            user,
            success: user? true : false,
            message:"Success!"
          })
        }else{
          res.json({err,
            message:"Bad login"})
        }
        
      } catch(err) {
        
        
        res.json({err,
        message:"Bad login"})
      }
    }
  })

  module.exports = router;