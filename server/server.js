const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");


const app = express();


//MIDDLEWARE
app.use(morgan ('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//GET - RETRIEVE DAT FROM THE SERVER
app.get('/', (req, res) => {
  res.json('Hello amazon clone');
})

//POST - SEND DATA FROM FRONTEND TO BACK END

app.listen(3000, (err) => {
  if(err){
    console.log(err)
  } else {
    console.log('Listen on Port 3000')
  }
})