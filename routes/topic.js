var express = require('express');
var router = express.Router();
const User = require('../models/in_memo/user')
const Topic = require('../models/in_memo/topic')
/* GET topics listing. */
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let topics = await Topic.getTopics()
            return topics
        })()
        .then(topics => {
            res.json({
                code: 0,
                topics
            })
        })
        .catch(e => {
            next(e)
        })
    })
    .post((req, res, next) => {
        (async () => {
            let user = await User.getUserById(+req.body.userId)
            console.log(user)
            let topic = await Topic.createNewTopic({
                creator: user,
                title: req.body.title,
                content: req.body.content
            })
            return topic
        })()
        .then(topic => {
            res.json({
                code: 0,
                topic
            })
        })
        .catch(e => {
            next(e)
        })
    })
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let topic = await Topic.getTopicById(+req.params.id)
            return topic
        })()
        .then(topic => {
            res.json({
                code: 0,
                topic
            })
        })
        .catch(e => {
            next(e)
        })
    })
    .patch((req, res, next) => {
        (async () => {
            let topic = await Topic.updateTopicById({
                id: +req.params.id,
                newInfo: req.body
            })
            return topic
        })()
        .then(topic => {
            res.json({
                code: 0,
                topic
            })
        })
        .catch(e => {
            next(e)
        })
    })

router.route('/:id/reply')
    .post((req,res,next) => {
        (async () => {
            // let user = await User.getUserById(+req.body.userId)
            let topic = await Topic.reply(req.body.userId,{
                topicId: req.params.id,
                content: req.body.content
            })
            return topic
        })()
        .then(topic => {
            res.json({
                code: 0,
                topic
            })
        })
        .catch(e => {
            next(e)
        })
    })
module.exports = router;
