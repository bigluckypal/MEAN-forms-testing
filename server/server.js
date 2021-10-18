// 1. imports/requires the packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

let url = "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers";

// port
const PORT = 3000;

const app = express();

// handle the json data
app.use(bodyParser.json());

app.use(cors());

// test/check get request
app.get('/',function(req, res){
  res.send('Hello from server!');
})

// add endpoint
app.get('/api/supervisors', function(req,res){
  let data = [];
  let temp = [];
  let result = [];

  (async () => {
    try {
      const response = await axios.get(url);
      data = response.data;

      for (let index = 0; index < data.length; index++) {
        if (1 * data[index].jurisdiction) {
          continue;
        } else {
          if (data[index].jurisdiction == 0) {
            continue;
          } else {
            temp.push(data[index]);
          }
        }
      }

      temp.sort(function (a, b) {
        return a.jurisdiction.localeCompare(b.jurisdiction) || a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
      });

      for (let i = 0; i < temp.length; i++) {
        const element = temp[i].jurisdiction + ' - ' + temp[i].lastName + ', ' + temp[i].firstName;
        result.push(element);
      }

      res.status(200).send(result);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
})


// add endpoint
app.post('/api/submit', function(req,res){
  // req.body - contains user data send by the angular
  console.log(req.body);

  if (req.body.firstName == '') {
    res.status(401).send({'message': 'First Name is not provided.'});    
  } else if (req.body.lastName == '') {
    res.status(401).send({'message': 'Last Name is not provided.'});    
  } else if (req.body.supervisor == '') {
    res.status(401).send({'message': 'Supervisor is not provided.'});    
  } else {
    res.status(200).send({'message': req.body});
  }
})


// listen to request
app.listen(PORT, function(){
  console.log('Server running on localhost port: ', PORT);
})
