var express = require('express');
var app = express();
const s3router = require('react-s3-uploader/s3router');

// todo: add here logger to check all uploaded pics/files
app.use('/s3', s3router({
  bucket: "ico1",
  region: 'eu-west-1', //optional
  headers: {'Access-Control-Allow-Origin': '*'}, // optional
  getFileKeyDir: (req) => {
    return req.query.dir;
  }
}));


app.listen(5001, function () {
  console.log('AWS_ACCESS_KEY_ID: ', process.env.AWS_ACCESS_KEY_ID);

});
