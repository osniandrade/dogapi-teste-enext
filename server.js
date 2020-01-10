const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log('Example app listening on port 80!');
});