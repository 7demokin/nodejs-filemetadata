var express = require('express');
var cors = require('cors');
var multer  = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

upload = multer({dest:'uploads/'}).single("upfile");
app.post('/api/fileanalyse',  (req, res) => {
    upload(req, res, (err) => {
    if(err) return console.log(err)
    console.log(req.file)
    let {originalname, mimetype, size} = req.file
    res.json({name:originalname, type: mimetype, size: size});
  });
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
