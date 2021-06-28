const mongoose = require("mongoose");
require("./tournament_model");

const DB_Name = "soccerTournament";
const DB_Url = "mongodb://localhost:27017/" + DB_Name;

mongoose.connect(DB_Url, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + DB_Url);
});

mongoose.connection.on("disconnected ", function(){
    console.log("Mongoose disconnected");
})

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error "+ err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to Mongoose because of application termination.");
        process.exit(0)
    })
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to Mongoose because of application termination.");
        process.exit(0)
    })
})

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to Mongoose because of application restart.");
        process.kill(process.pid, "SIGUSR2")
    })
});
