const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://JustifyEster:esterpasaribu1905@ds031902.mlab.com:31902/printify';
var port = 2000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('<h1> SELAMAT DATANG DI API MongoDB PRINTIFY <h1>')
})

//axios.get('http://localhost:2000/getListUser/Justify%20Ester')

//axios.get('http://localhost:2000/getListUser, {
    //params : {
        //umur : 18;
    //}
//})

app.get('/getListUser', (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection('users');
        userCol.find({}).toArray((err1,docs) => {
            db.close();
            console.log(docs);
            // console.log(docs[1].julukan);
            // console.log(docs[1]._id);
            res.send(docs)
        })
    })
})

//axios.get('http://localhost:1997/tify) 
//Ini untuk meng-filter nama

app.get('/getListUser/:nama', (req,res) => {
    var nama = req.params.nama;
    MongoClient.connect(url, (err,db) => {
        var userCol = db.collection('users');
        userCol.find({ nama: { '$regex': nama, '$options': 'i'}}).toArray((err1,docs) => {
            db.close();
            console.log(docs);
            // console.log(docs[1].julukan);
            // console.log(docs[1]._id);
            res.send(docs)
        })
    })
})

app.post('/addUser', (req,res) => { //addUSer nama path APInya
    console.log(req.body);
    MongoClient.connect(url,(err,db) => {
        var userCol = db.collection('users'); // users nama collection mongoDBnya
        userCol.insertMany(req.body, (err1, result) => {
            db.close();
            res.send(result);
            //resultnya isinya array of object
        })
    })
})

app.delete('/deleteUser/:nama', (req,res) => {
    MongoClient.connect(url,(err,db) => {
        userCol = db.collection('users');
        userCol.deleteone({ nama: req.params.nama }, (err1,result) => {
            // userCol.deleteone({ julukan: req.params.nama }, (err1,result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    })
})

app.put('/updateUser/:nama', (req,res) => {
    MongoClient.connect(url,(err,db) => {
        userCol = db.collection('users');
        // userCol.updateMany({ nama: req.params.nama}, {$set: {"skills: [], "item": []}}, (err1,result) => {
        userCol.updateMany({ nama: req.params.nama}, {$set: req.body}, (err1,result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    })
})

app.put('/userMedan', (req,res) => {
    MongoClient.connect(url,(err,db) => {
        userCol = db.collection('users');
        userCol.updateMany({}, {$set: {asal: "Medan"}}, (err1,result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    })
})




app.listen(port, () => console.log('API aktif di port' + port))