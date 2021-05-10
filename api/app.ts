const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3333;
const userRoutes = require("./src/routes/user");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/user", userRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(port);
  console.log(`app listening at : ${port} `);
});

module.exports = app;
