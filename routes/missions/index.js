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
    const slug = req.params.slug
    const getMissionBySlug = `
      query GetMissionBySlug($slug: String){
        mission(where: {slug: $slug} ) {
          id
          name
          slug
          description {
            html
          }
          staffs {
            email
            givingUrl
            name
            mainPicture {
              handle
            }
            description {
              html
            }
          }
          ministryPictures {
            handle
          }
          mainPicture {
            handle
          }
        }
      }
    `;
      
    const { mission } = await client.request(getMissionBySlug, { slug: slug })
    console.log(mission)
    res.render('missions', {
      mission: mission
    });
});
  

module.exports = router;