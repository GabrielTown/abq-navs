const express = require("express");
const path = require('path')
// const dotenv = require("dotenv");
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

//Handle get request to fetch staff
app.get("/staffs", async (req, res) => {
  const query = `
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
        id
        name
        slug
      }
    }
      }
    }
    `;

  const { staffs } = await client.request(query);

  // console.log(staffs);

  //Create cards with staff info inside
  res.send(`
        ${staffs
          .map(
            (staff) => `
          <div class="mb-4">
            <div class="group relative block bg-black">
            <img
              alt="${staff.name} Picture"
              src="https://media.graphassets.com/${staff.mainPicture.handle}"
              class="absolute inset-0 h-full w-full object-cover opacity-65 transition-opacity group-hover:opacity-30"
            />
          
              <div class="relative p-4 sm:p-6 lg:p-8">
                <a 
                  href="./mission/?slug=${staff.mission.slug}"
                  class="underline underline-offset-4 transition-all text-sm hover:text-base font-medium uppercase tracking-widest text-pink-500"
                >
                  ${staff.mission.name}
                </a>
            
                <p class="text-xl font-bold text-white sm:text-2xl">${staff.name}</p>
            
                <div class="mt-32">
                  <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <div class="text-sm text-white">
                      ${staff.description.html}
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                <a
                  class="inline-block border border-pink-600 bg-pink-600 px-8 mr-2 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-pink-500"
                  href="${staff.givingUrl}"
                >
                  GIVE
                </a>
                <a
                  class="inline-block border border-pink-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-white-500"
                  href="mailto: ${staff.email}"
                >
                  CONTACT
                </a>
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
    `);
});




// //Handle get mission
// app.get("/mission", async (req, res) => {
//   // console.log(req.query)

//   res.send("Hello, id is: " + req.query.slug)

// });

app.listen(3000, () => {
  console.log("serving on 3000");
});
