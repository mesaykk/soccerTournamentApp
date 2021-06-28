const express = require("express");
const path = require("path")

require("./api/data/db");
const routes = require("./api/route/index");
const app = express();



app.set("port", 5555);
app.use((req, res, next)=>{
    console.log(req.params + " " + req.url);
    next();
})

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
    console.log("App started at ", server.address().port)
})