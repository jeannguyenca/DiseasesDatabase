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

// set our port to either a predetermined port number if you have set it up, or 3001
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
 res.json({ message: 'Hello, World!' });
});

router.get("/databases/:country", (req, res) => {
  let finalResult = [];
  let whs = [];
  let cho = [];
  let ntd = [];
  let diseases = [];

  const { country } = req.params;
  const year = (new Date().getFullYear() - 4).toString();
  
  getData(country, year, db).toArray((err, result) => {
      //read through records
      if (err) {
        res.json({ success: false, error: err });
      }
    diseases = Object.keys(result['0']).splice(2);
      //populate cho array
      result.forEach(element => {
        if (Object.keys(element).includes("cho")){
          populateArray(element,"cho", cho);
        }
        if (Object.keys(element).includes("whs")) {
          populateArray(element, "whs", whs);
        }
        if (Object.keys(element).includes("ntd")) {
          populateArray(element, "ntd", ntd);
        }

      });

      for(var i = 0; i < diseases.length; i++){
        console.log(result['0'][diseases[i]]);
      }
      finalResult.push(cho);
      finalResult.push(ntd);
      finalResult.push(whs);

      //send final array
      return res.json({ success: true, data: finalResult });
    });

});

router.get("/databases", (req, res) => {
  res.json({ success: false, error: "No data found" });
})

app.use(express.static(path.join(__dirname, "..", "public")));

// Use our router configuration when we call /api
app.use('/api', router);

var server = app.listen(process.env.PORT || 5000, function() {
  var port = server.address().port;
  console.log("Express is working on port " + port + "and looking for folder " + __dirname);
});