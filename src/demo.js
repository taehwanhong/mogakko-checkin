/**
 * Created by davidhong on 27/04/2017.
 */

// import needed packages
const _ = require('lodash');
const express = require('express');
const app = express();
const http = require('http');
const pug = require('pug');

app.set('view engine', 'pug');


app.get('topic/new', function (req, res) {
    res.send("hi");
})

