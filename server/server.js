// Web server

const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const MySol2Uml = require('./js/mysol2uml.js');
const path = require('path');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async function(req, res){
  let address = req.query.address;
  try{
    let data = await MySol2Uml.sol2uml(address);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
  }catch(e){
    console.log('Address NOT FOUND');
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Contract not found');
  }
  /*res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-type', 'image/xml+svg');
  res.sendFile(path.join(__dirname, `./${address}.svg`));*/

});

let server = app.listen(8080, function(){
  console.log('Server Listening on port 8080 . . .');
});
