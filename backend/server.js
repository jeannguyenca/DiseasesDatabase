import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { getSecret } from "./secret";
import { getData, populateArray } from "./getData";

const MongoClient = require("mongodb").MongoClient;
const path = require('path');


// and create our instances
const app = express();
const router = express.Router();

let db;

MongoClient.connect(getSecret("dbUri"), { useNewUrlParser: true } , function (err, client) {
  if (err) throw err;
  db = client.db("who_database");
});

router.get("/databases/:country", (req, res) => {
  let finalResult = [];
  let diseases = [];
  let diseaseNames = [];

  const { country } = req.params;
  const year = (new Date().getFullYear() - 8).toString();
  
  getData(country, year, db).toArray((err, result) => {
    //read through records
    if (err) {
      res.json({ success: false, error: err });
    }
    //array of all disease names
    diseaseNames = Object.keys(result['0']).splice(2);

    //array off all disease infos
    diseases = result['0'].diseases;

    //push data of each disease
    for (let i = 0; i < diseaseNames.length; i++){
      //add arrays of diseases into the final array
      let array = populateArray(result["0"], diseaseNames[i]);

      //push array with at least 1 data field (except name)
      if(array.length > 1){
        finalResult.push(array);
      }else{
        // console.log(diseases[diseaseNames[i]]);
        delete diseases[diseaseNames[i]];
      }
    }

    finalResult.push(diseases);

    //send final array
    return res.json({ success: true, data: finalResult });
    });

});

// set our port to either a predetermined port number if you have set it up, or 3001
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "..", "public")));
// Use our router configuration when we call /api
app.use('/api', router);

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get("/databases", (req, res) => {
  res.json({ success: false, error: "No data found" });
})

var server = app.listen(process.env.PORT || 5000, function() {
  var port = server.address().port;
  console.log("Express is working on port " + port + " and looking for folder " + __dirname);
});