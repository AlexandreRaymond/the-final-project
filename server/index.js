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
  addToFavourites,
  getFavourites,
  deleteFavourites,
  editComment,
  deleteComment,
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
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(express.json())
  //.use(express.urlencoded({ extended: false }))

  // Endpoints

  .get(`/api/teams`, getTeams)

  .get(`/api/standings/nhl`, getStanding)

  .get(`/api/teams/:id`, getATeamInfo)

  .get(`/api/player/:id`, getPlayer)

  .get(`/api/get/profile/:userId`, getProfile)

  .get(`/api/get/comments/:id`, getComments)

  .get(`/api/get/favourites/:userId`, getFavourites)

  .post(`/api/post/comment`, postComment)

  .post(`/api/post/add-to-favourites/:userId`, addToFavourites)

  .patch(`/api/patch/profile/:userId`, patchProfile)

  .patch(`/api/delete/favourites/:userId`, deleteFavourites)

  .patch(`/api/patch/comment/:commentId`, editComment)

  .delete(`/api/delete/comment/:commentId`, deleteComment)

  // Listening on PORT
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
