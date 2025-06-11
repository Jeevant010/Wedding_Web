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

// mongoose.connect(
    
//     "mongodb+srv://Tours:" +
//     process.env.MONGO_PASSWORD +
//     "@cluster0.afxf5.mongodb.net/Tour_Travels?retryWrites=true&w=majority&appName=Cluster0",
//     {}
// )
// .then((x) => {
//     console.log("connected to mongo!");
// })
// .catch((err) => {
//     console.log("Error while connecting to mongo\n",err);
// });


app.get("/",(req, res) => {
    res.send("Home Page of this website");
})

app.listen(port, () => {
    console.log("App is listening on port : http://localhost:3131", port);
})