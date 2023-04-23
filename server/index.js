"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getPlayer,
  getTeams,
  getATeamInfo,
  getStanding,
  postComment,
  getComments,
  patchProfile,
  getProfile,
  AddToFavourites,
} = require("./handlers");

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

  .get(`/api/standings/nhl`, getStanding)

  .get(`/api/teams/:id`, getATeamInfo)

  .get(`/api/player/:id`, getPlayer)

  .get(`/api/get/profile/:userId`, getProfile)

  .get(`/api/get/comment/:id`, getComments)

  .post(`/api/post/comment`, postComment)

  .post(`/api/post/add-to-favourites/:userId`, AddToFavourites)

  .patch(`/api/patch/profile/:userId`, patchProfile)
  // Listening on PORT
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
