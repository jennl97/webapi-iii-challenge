const express = require('express');
const UserDB = require('./userDb');
const PostDB = require('../posts/postDb');


const router = express.Router();

router.post('/', validateUser, (req, res) => {
    res.status(200).json(req.users);
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    UserDB.get(req.query)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Danger Will Robinson!"
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.users);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const {id } = req.params
    UserDB.getById(id)
    .then(users => {
        if(users) {
            req.users = users;
            next();
        } else {
            res.status(400).json({
                message: "invalid user id"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Houston, we have a problem.'
        });
    })

};

function validateUser(req, res, next) {
    const newUser = req.body
    UserDB.insert(newUser)
    .then(users => {
        if(!users.name){
            res.status(400).json({
                message: "missing required name field"
            })
        } else if (!users){
            res.status(400).json({
                message: "missing user data"
            })
        } else {
            next();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "That's a no from me, Dawg."
        })
    })


};

function validatePost(req, res, next) {

};

module.exports = router;
