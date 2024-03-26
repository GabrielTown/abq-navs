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
    const getAllStaff = `
      {
        staffs {
          email
          givingUrl
          mainPicture {
            handle
          }
          name
          phone
          description {
        html
      }
      mission {
        ... on Mission {
          name
          slug
        }
      }
        }
      }
      `;
  
    const { staffs } = await client.request(getAllStaff);
  
    res.render('staff', {
      staffs: staffs
    });
});
  

  module.exports = router;