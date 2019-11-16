const express = require('express');
const router = express.Router();

const Post = require('../models/post')


//Retrieve contacts
// router.get('/posts', (req, res, next) => {
//     Post.find((err, posts) => {
//         res.json(posts)
//     })
// })
//Send contacts
// router.post('/posts', function (req, res, next) {

//     var newPost = new Post({
//         title: req.body.title,
//         contact: req.body.contact

//     });
//     newPost.save(function (err, post) {
//         if (err) {
//             res.json({ msg: `Failed to add contact ${err}` })
//             console.log(err);
//         }
//         else if (post) {
//             res.json({ msg: `Contact added successfully` })

//         }
//     })
// })




// delete contacts
router.delete('/post/:id', (req, res, next) => {
    //logic
    Post.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})


module.exports = router