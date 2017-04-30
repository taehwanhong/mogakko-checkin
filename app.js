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


app.set('views','./views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

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

// app.get('/topic/:id', function(req, res){
//     let id = req.params.id;
//
//     fs.readdir('data', function (err, files) {
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', function(err, data){
//             if(err){
//                 console.log(err);
//                 res.status(500).send('internal server err');
//             }
//             res.render('view', {title:id, topics:files, description:data});
//         })
//     })
// })

app.post('/topic', function (req, res) {
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('data/'+ title, description, function(err){
        if(err){
        console.log(err);
        res.status(500).send('internal server error');
        }
        res.send("post success" );
    });

})

app.listen(3000, function () {
    console.log("run server at port 3000");
})