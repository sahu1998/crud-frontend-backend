const express = require("express");
const cors = require("cors");
const { route } = require("./Routes");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/cms", route);

app.listen(process.env.PORT, () => {
  console.log(`listening port ${process.env.PORT}`);
});
