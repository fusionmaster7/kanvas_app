const express = require("express");
const axios = require("axios");
const ejs = require("ejs");

const app = express();

app.set("view-engine", ejs);
app.use(express.static(`${__dirname}/public`));

app.get("/dashboard", (req, res) => {
  if (!req.query.state) {
    res.render("pages/dashboard.ejs");
  } else {
    axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then((resp) => {
        const myState = resp.data.find((e) => e.state === req.query.state);
        let districts = [];
        myState.districtData.forEach((e) => {
          let districtObj = { ...e };
          districts.push(districtObj);
        });
        res.render("pages/state.ejs", { districts: districts });
      });
  }
});

app.get("/all", (req, res) => {
  axios
    .get("https://api.covid19india.org/v2/state_district_wise.json")
    .then((resp) => {
      let states = [];
      resp.data.forEach((newState) => {
        let stateObj = {
          name: newState.state,
          active: 0,
          deceased: 0,
          confirmed: 0,
          recovered: 0,
        };
        newState.districtData.forEach((district) => {
          stateObj.active += district.active;
          stateObj.recovered += district.recovered;
          stateObj.confirmed += district.confirmed;
          stateObj.deceased += district.deceased;
        });
        states.push(stateObj);
      });
      res.render("pages/states.ejs", { states: states });
    });
});
app.listen(8000);
