require("dotenv").config();
const express = require("express");
const { getPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
const port = 3000;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});

app.post("/api/passwords", (request, response) => {
  response.send("Under construction");
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.DB_USER_PASSWORD, process.env.DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`PW4U API listening at http://localhost:${port}`);
  });
}

run();
