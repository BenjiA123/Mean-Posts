const express = require('express');
const bodyParser = require('body-parser')
const Post = require('./models/post')
const mongoose = require("mongoose")
var cors = require('cors');
const app = express();
//adding middle wares -cors
app.use(cors());
mongoose.connect("mongodb://localhost:27017/posts")

    .then(() => {
        console.log("Connected to database ")
    })
    .catch(() => {
        console.log("Connection failed")
    })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET ,POST,PUT , PATCH , DELETE , OPTIONS");
    next();
})



app.post('/api/posts', (req, res, next) => {
    var post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: "Post added Successfully",
                postId: createdPost._id
            })
        })
})
app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "The message was sent successfully", // Tfind methodhis is how to retrieve data . I use the 
                posts: documents
            })
        })


})

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params._id)
        .then(
            post => {
                if (post) {
                    res.status(200).json(post)
                } else {
                    // res.status(404).json({
                    //     message: "Post not found"
                    // })
                }
            }
        )



})
app.put("/api/posts/:_id", (req, res, next) => {
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params._id }, post)
        .then((result) => {
            console.log(result)
            console.log("It was updated")
            res.status(200).json({
                message: "Update was Successfull"
            })
        })
})
app.delete('/api/posts/:_id', (req, res, next) => {
    Post.deleteOne({ _id: req.params._id })

        .then(
            (result) => {
                console.log(result);
                console.log("It was deleted")
                res.status(200).json({
                    message: "Post Deleted"
                })
            }
        )

})

module.exports = app;