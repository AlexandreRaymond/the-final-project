"use strict";

const express = require("express");
const morgan = require("morgan");

const { getPlayer, getTeams, getRosterByTeams } = require("./handlers");

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
  //.use(express.static("./server/assets"))
  .use(express.json())
  //.use(express.urlencoded({ extended: false }))

  // Endpoints

  .get(`/api/teams`, getTeams)

  .get(`/api/teams/:id/roster`, getRosterByTeams)

  .get(`/api/player/:id`, getPlayer)

  // for pictures: http://nhl.bamcontent.com/images/headshots/current/168x168/(player id).jpg

  // Listening on PORT
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
