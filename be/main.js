const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = 3030;
const app = express();

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const loginRoute = require("./routes/login");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/login", loginRoute);

mongoose.connect(
  "mongodb+srv://damianopavon:Cll1MsljWkIYAhRm@epicodedb.6ymfeeo.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "errore di connessione"));
db.once("open", () => {
  console.log("connesso");
});

app.listen(PORT, () =>
  console.log(`Server connected and listening an port ${PORT}`)
);
