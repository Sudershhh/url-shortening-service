require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser')
const url = require('url');
const isUrl = require('is-url')

let counter = 1;

let shortenedUrls={}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api/shorturl/:short_url',function(req,res){

  let urlCount = req.params.short_url;
  res.redirect(shortenedUrls[urlCount]);

})

app.post('/api/shorturl', function(req,res){

  const url = req.body.url


  //Invalid URL test
  if(!isUrl(url))
  {
    res.send({ error: 'invalid url' })
    return
  }
  

  shortenedUrls[counter] = url;
  
  res.send({ original_url : url, short_url : counter})
  counter++;


})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
