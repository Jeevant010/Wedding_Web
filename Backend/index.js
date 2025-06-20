// make any changes required to run the Featured wedding section
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const home = require('./models/HomePage')
const port = 9000;

const passport = require("passport");
const homeRoutes = require('./routes/HomePage');
const searchRoutes = require('./routes/search');
const app = express();
// console.log("Print it everywhere");

// Configure middleware FIRST
app.use(express.json());
app.use(cors({
    origin : ['http://localhost:5173', 'https://wedding-web-gold.vercel.app'],
    methods : "GET,POST,PUT,DELETE",
    Credential: true
}));


// THEN mount routes
app.use('/home', homeRoutes);
app.use('/api/search', searchRoutes);

mongoose.connect(

    "mongodb+srv://Deepesh:" + process.env.MONGO_PASSWORD +"@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    
     
    {}
)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(passport.initialize());
app.get("/", (req, res) =>{
    res.send("Home Page of this Wedding Website");
})

app.listen(port, () => {
    console.log("App is listening on port : http://localhost:" + port);
})

