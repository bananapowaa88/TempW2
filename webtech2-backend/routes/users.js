var express = require('express');
var router = express.Router();

const User = require('../models/User');


/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      if (req.user) {
        res.json(req.user)
      } else {
        res.send('Not authenticated!');
      }
    }
  })
});

module.exports = router;
