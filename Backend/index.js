const express = require("express");
const app = express();

const port = process.env.PORT || 3131;

const mongoose = require("mongoose");
const passport = require("passport");
const core = require("cors");

console.log("Print it everywhere");



app.use(core({
    origin : "http://localhost:3000",
    methods : "GET,POST,PUT,DELETE",
    Credential: true
}));

app.use(express.json());
require("dotenv").config();

mongoose.connect("mongodb+srv://Deepesh:" + process.env.MONGO_PASSWORD + "@cluster0.4l8pl.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


app.get("/",(req, res) => {
    res.send("Home Page of this website");
})

app.listen(port, () => {
    console.log("App is listening on port : http://localhost:3131", port);
})