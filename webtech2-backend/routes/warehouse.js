var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

/* GET items by user */
router.get('/', function (req, res, next) {
    if (!req.user) {
        res.status(401).send('Not authenticated!');
        return
    }

    res.status(200).json(req.user.items);
});

router.post('/add', function (req, res) {
    if (!req.user) {
        res.status(401).send('Not authenticated!');
        return;
    }

    User.findById(req.user.id, (error, user) => {

        user.items.push(req.body);

        user.save()
            .then(item => {
                res.status(200).json(user.items[user.items.length - 1]);
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
                console.log(err);
            });
    });

});


router.put('/change/:id', function (req, res) {
    if (!req.user) {
        res.status(401).send('Not authenticated!');
    }

    User.findById(req.user.id, (error, user) => {

        let itemIndex = user.items.findIndex(i => i.id == req.params.id);

        if (itemIndex === -1) {
            res.status(404).send('Not found');
            return;
        } else {
            Object.keys(req.body).forEach(x => {
                user.items[itemIndex][x] = req.body[x];
            })
        }

        user.save()
            .then(item => {
                res.status(200).json(user.items[itemIndex]);
            })
            .catch(err => {
                res.status(400).send("unable to update");
            });
    });
});


router.delete('/delete/:id', function (req, res) {
    if (!req.user) {
        res.status(401).send('Not authenticated!');
        return;
    }

    User.findById(req.user.id, (error, user) => {

        let itemIndex = user.items.findIndex(i => i.id == req.params.id);

        if (itemIndex === -1) {
            res.status(404).send('Not found');
            return;
        } else {
            user.items.splice(itemIndex, 1);
        }

        user.save()
            .then(item => {
                res.status(200).send('Deleted');
            })
            .catch(err => {
                res.status(400).send("unable to delete");
            });
    });
});

module.exports = router;
