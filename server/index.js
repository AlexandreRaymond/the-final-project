"use strict";

const express = require("express");
const morgan = require("morgan");

const { getPlayer } = require("./handlers");

// Import handlers here
const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // Endpoints
  .get("/api/people/:id", getPlayer)

  // Listening on PORT
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
