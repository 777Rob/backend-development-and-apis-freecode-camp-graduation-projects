require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const shortenedUrls = []

app.use(cors());


app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencod

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  const incomingUrl = req.body.url;
  if(incomingUrl.indexOf("https://www") < 0 && incomingUrl.indexOf("http://www") < 0 && incomingUrl.indexOf("https://") < 0){
    res.json({ error: 'invalid url' })
  }else{
  
  const existingShortenedUrl = shortenedUrls.filter(shortenedUrl => shortenedUrl.original_url == incomingUrl);
    
  if(existingShortenedUrl.length > 0){
    res.json(existingShortenedUrl[0])
  }
  const newShortenedUrl = {original_url: incomingUrl, short_url: shortenedUrls.length+1}
    
  shortenedUrls.push(newShortenedUrl)
    
  res.json(newShortenedUrl);
  }
});


app.get('/api/shorturl/:id', function(req, res) {
  const originalUrl = shortenedUrls.filter(url => url.short_url == req.params.id);
  if(originalUrl.length > 0 ){
  res.redirect(originalUrl[0].original_url)
    
  }else{
    res.json({ error: 'invalid url' })
  }
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
