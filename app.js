/**
 * Created by davidhong on 27/04/2017.
 */
/**
 * Created by davidhong on 27/04/2017.
 */

// import needed packages
const _ = require('lodash');
const express = require('express');
const app = express();
const http = require('http');
const pug = require('pug');
const bodyParser = require('body-parser');
const fs = require('fs');//file system

// multer
const multer = require('multer');
const _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: _storage })//upload destination setting


app.set('views','./views');
app.set('view engine', 'pug');
app.use('/', function(req, res){
    res.render('maptest');
})

app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

// upload route
app.get('/upload', function(req, res){
   res.render('upload');
});

// multer upload
app.post('/upload', upload.single('userfile'), function(req, res){


    res.send('uploaded: '+req.file.filename);

});

// topic - new route
app.get('/topic/new', function (req, res) {
    res.render('new');
});

// topic route
app.get(['/topic', '/topic/:id'], function(req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        let id = req.params.id;
        console.log(id);
        if (id) {
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('internal server err');
                }
                res.render('view', {title: id, topics: files, description: data});
            })
        } else {
            res.render('view', {topics: files, title : "welcome", description: "hello JS"});
        }
    })
});

//server start at 3000 localhost
app.listen(3000, function () {
    console.log("run server at port 3000");
})