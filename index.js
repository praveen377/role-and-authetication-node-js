const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");


// Bring in the app constants
const {DB,PORT} = require("./config");

//intializaion the application
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

//User Router Middleware
app.use("/api/users",require("./routes/users"));

//connection with database
mongoose.connect(DB, {useFindAndModify:true ,useNewUrlParser:true, useUnifiedTopology:true},function(err){
    if(!err)
    console.log("database is connected sucessfully");
    else
    console.log(err );
});

app.listen(PORT ,function(){
    console.log("server is running on 3000 port");
});
