const express = require("express");
const app = express();
const db = require("./routes/db-config");
const cookie = require("cookie-parser");

const PORT = process.env.PORT || 5000;

// Setup for view
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/assets", express.static(__dirname + "/public/assets"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Use cookie and json
app.use(cookie());
app.use(express.json());

// Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
});

// Routing
app.use("/api", require("./controllers/auth"));
app.use("/", require("./routes/pages"));

// Run server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
