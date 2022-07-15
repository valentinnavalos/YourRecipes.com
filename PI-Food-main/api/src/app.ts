import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import routes from './routes'
const routes = require("./routes/index.js");
const { SERVER_FRONT } = require("../../client/paths/path.js");

require("./db.js");

const server = express();

// server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

//de acá para abajo se puede reemplazar con un CORS.
server.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin', ${SERVER_FRONT}`); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/api", routes);

// Error catching endware.
server.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});

module.exports = server;
