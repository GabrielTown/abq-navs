const express = require("express");
const path = require('path')
const dotenv = require("dotenv");
// const { AwesomeGraphQLClient } = require("awesome-graphql-client");
// const fetch = require("node-fetch");
// dotenv.config();


const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// const endpoint = process.env["HYGRAPH_ENDPOINT"];

// const client = new AwesomeGraphQLClient({
//   endpoint: endpoint,
//   fetch,
// });


const staff = require('./routes/staff');
const missions = require('./routes/missions');

app.use('/staff', staff)
app.use('/missions', missions)

app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("serving on 3000");
});
