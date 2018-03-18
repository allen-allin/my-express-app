var express = require('express');
var router = express.Router();
const User = require('../models/in_memo/user')
/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let users = await User.getUsers()
            return users
        })()
        .then(users => {
            res.json({
                code: 0,
                users
            })
        })
        .catch(e => {
            next(e)
        })
    })
    .post((req, res, next) => {
        (async () => {
            let user = await User.createNewUser({
                name: req.body.name,
                age: req.body.age
            })
            return user
        })()
        .then(user => {
            res.json({
                code: 0,
                user
            })
        })
        .catch(e => {
            next(e)
        })
    })
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let user = await User.getUserById(+req.params.id)
            return user
        })()
        .then(user => {
            res.json({
                code: 0,
                user
            })
        })
        .catch(e => {
            next(e)
        })
    })
    .patch((req, res, next) => {
        (async () => {
            let user = await User.updateUserById({
                id: +req.params.id,
                newInfo: req.body
            })
            return user
        })()
        .then(user => {
            res.json({
                code: 0,
                user
            })
        })
        .catch(e => {
            next(e)
        })
    })
module.exports = router;
