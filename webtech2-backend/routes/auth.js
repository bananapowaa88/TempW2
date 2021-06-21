const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/register", (req, res, next) => {
    const User = require('../models/User');
    const search = User.find({
        email: req.query.email
    }, function (error, data) {
        if (data.length) {
            res.status(400).send("User exists");
            return;
        }

        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `Registered in ${user.id}` });
            });
        })(req, res, next);
    });

});

router.post("/login", (req, res, next) => {
    const search = User.find({
        email: req.query.email
    }, function (error, data) {
        if (!data.length) {
            res.status(400).send("User not exists");
            return;
        }

        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(401).json({ errors: "Bad credentials" });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `logged in ${user.id}` });
            });
        })(req, res, next);
    });


});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send();
});

module.exports = router;