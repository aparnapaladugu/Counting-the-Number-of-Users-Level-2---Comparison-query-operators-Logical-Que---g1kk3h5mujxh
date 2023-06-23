const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require("../models/user.js");

// Router Middlewares
app.use(express.json());

app.get("/", async function(req, res) {
  var count = 0;

  // Get the name from the query parameters
  const name = req.query.name;

  // If name is not provided or empty, return count of all users
  if (!name || name.trim() === "") {
    count = await users.countDocuments();
  } else {
    // Construct a regular expression to match names starting with the provided prefix (case-insensitive)
    const regex = new RegExp(`^${name}`, "i");

    // Find the count of users whose name matches the prefix
    count = await users.countDocuments({ name: regex });
  }

  res.send(JSON.stringify(count));
});

module.exports = app;



// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const users   =require("../models/user.js");

// //Router Middlewares
// app.use(express.json());

// //Type of query (Hint)

// /*

// 1. / --> this means we need to consider all users
// 2. /?name=swa --> Will return count of all the user name that have prefix swa. We will (Swaraj Jain, Swarak agrawal, etc). 
// 3. /?name= -->this means we need to consider all users

// */


// // Complete this Route which will return the count of Number of Prefixmatch for the name in the query/

// app.get("/",async function(req,res){

//     var count = 0;

//     //Write you code here
//     //update count variable

//     res.send(JSON.stringify(count));

// });

// module.exports = app;
