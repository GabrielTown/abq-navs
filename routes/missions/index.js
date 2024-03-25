const express = require("express");
const router = express.Router();
const { AwesomeGraphQLClient } = require("awesome-graphql-client");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["HYGRAPH_ENDPOINT"];

const client = new AwesomeGraphQLClient({
  endpoint: endpoint,
  fetch,
});

router.get("/", async (req, res) => {
    res.send('All Missions')
});

router.get("/:slug", async (req, res) => {
    res.send(`<h1>${req.params.slug}</h1>`)
});
  

module.exports = router;