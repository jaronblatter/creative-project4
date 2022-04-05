const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/projects', {
  useNewUrlParser: true
});


// Create a new item in the museum: takes a title and a path to an mp3.
app.post('/api/tracks', async (req, res) => {
  console.log("api/tracks ",req.body.title);
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/tracks/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/tracks/:id', async (req, res) => {
  console.log("edit route");
  try {
    console.log(req.params.id);
    const item = await Item.findOne({
      _id: req.params.id
    });
    console.log(item.title);
    console.log(item.path);
    item.title = req.body.title;
    item.description = req.body.description;
    console.log(item.title);
    try {
      await item.save();
      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.get('/api/tracks', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);i
    res.sendStatus(500);
  }
});


const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/audio/',
  limits: {
    fileSize: 10000000
  }
});


// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  description: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/audio', upload.single('audio'), async (req, res) => {
  console.log("api/audio ", req.file);
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/audio/" + req.file.filename
  });
});


app.listen(4000, () => console.log('Server listening on port 4000!'));
