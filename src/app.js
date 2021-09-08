const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();

const port = process.env.PORT || 3000

// define the path for Views and static directory
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up the views engine and changing the Views directory path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serving up the public directory
app.use(express.static(publicDirectory));

// using app.get to setup the server
app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather",
    name: "Muhammad Saif",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    name: "Muhammad Saif",
    title: "About",
    info:"This app was created by Muhammad Saif. This pulls data form mapbox and weatherstack api's"
  });
});

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help page",
    name: "Muhammad Saif",
    helpMessage: "Please Check out the aricles for help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide the location on the query string",
    });
  }
  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    weather(latitude, longitude, (err, forecast) => {
      res.send({
        location,
        forecast,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error.hbs", {
    errorMessage: "Help article not found",
    name: "Muhammad Saif",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("error.hbs", {
    errorMessage: "404 Page Not Found!",
    name: "Muhammad Saif",
    title: "404",
  });
});

//setting up the server to listen at port 3000
app.listen(port, () => {
  console.log("Server is Up!!");
});
