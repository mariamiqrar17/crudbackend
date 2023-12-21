const express = require("express");
const connectDB = require("./db/connectdb");
const dotenv = require("dotenv");
const cors = require("cors");

const device = require("./routes/device");
dotenv.config();

const app = express();
app.use(cors());
// Other backend setup code

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});