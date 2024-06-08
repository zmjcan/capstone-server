require("dotenv").config();

const express = require("express");
const knex = require("knex")(require("./knexfile"));
const apiRoutes = require("./routes/apiRoutes");
const privateRoutes = require("./routes/privateRoutes");

const cors = require("cors");
const fileupload = require("express-fileupload");


const PORT = process.env.PORT || 8080 || 8081;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(fileupload());
app.use(express.static('statics'))



app.use("/api", apiRoutes);
app.use("/private", privateRoutes);



app.listen(PORT, () =>{
    console.log("Server is listening on " +  `port ${PORT}`);
})