const fs = require("fs");
const path = require("path");
require("./db-connection");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const helmetHeaders = require("./utils/helmet-headers");

const config = require("./config");

const routes = require("./routes");

const app = express();

app.use(helmet(helmetHeaders));
// cors ------
app.use(cors());
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.use("/", express.static(path.join(__dirname, "..", config.STATIC_DIR)));

if (config.MODE === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("API! go to `/api`");
});

app.use("/api", routes);
/* eslint-disable */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end();
});

app.listen(config.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `listening at http://localhost:${config.PORT} (${config.MODE} mode)`
    );
  }
});
