"use strict";
const { MongoClient, ObjectId } = require("mongodb");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getMongoClient = async () => {
  try {
    console.log("MONGO", MONGO_URI);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("I'm in!");
    return client;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

console.log("today is", date);

// /api/player/:id
const getPlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}`
    );
    const playerstats = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=20222023`
    );
    const playerPic = await axios.get(
      `http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`
    );

    res.status(200).json({
      status: 200,
      player: result.data,
      stats: playerstats.data,
      pic: playerPic.config.url,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

// /api/teams
const getTeams = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams`);

    console.log("Result", result.data);

    res.status(200).json({
      status: 200,
      teams: result.data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

// /api/standings/nhl
const getStanding = async (req, res) => {
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/standings?season=20222023&date=${date}`
    );
    console.log("today is", date);
    console.log("stands", result.data);

    res.status(200).json({
      status: 200,
      data: result.data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

// /api/teams/:id
const getATeamInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`
    );
    const teamInfo = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}`
    );
    const teamLogo = await axios.get(
      `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`
    );
    console.log("Result", result.data);
    console.log("teamlogo", teamLogo.config.url);

    res.status(200).json({
      status: 200,
      roster: result.data.roster,
      team: teamInfo.data,
      logo: teamLogo.config.url,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

// /api/patch/profile/:userId
const patchProfile = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  // const { firstName, lastName, age, city, province, country } = req.body;
  const client = await getMongoClient();
  try {
    const db = await client.db("db-name");
    const users = await db.collection("users");
    console.log("body", req.body);
    const profile = await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { ...req.body.profileInfo } }
    );
    console.log("profile pro", profile);
    if (profile.value) {
      res.status(200).json({
        status: 200,
        data: profile,
        message: "Successfully patched!",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "Profile not found.",
      });
    }
  } catch (err) {
    console.log("Error", err);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

// /api/get/profile/:userId
const getProfile = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  const client = await getMongoClient();
  try {
    const db = await client.db("db-name");
    const profile = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    console.log("prolife profile", profile);
    if (profile) {
      res.status(200).json({
        status: 200,
        data: profile,
        message: "Successfully gotten!",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "Profile not found.",
      });
    }
  } catch (err) {
    console.log("Error", err);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

// /api/post/add-to-favourites/:userId
const AddToFavourites = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  const {
    playerId,
    name,
    team,
    picture,
    jerseyNumber,
    captain,
    alternateCaptain,
    goals,
    assists,
    points,
    gp,
    plusMinus,
    wins,
    losses,
    ot,
    gaa,
  } = req.body;
  const client = await getMongoClient();
  try {
    const db = await client.db("db-name");
    const users = await db.collection("users");
    const user = await users.findOne({ _id: new ObjectId(userId) }).toArray();
    console.log("user user", user[0]);
    if (!user[0].favoritePlayers) {
      const result = await users.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { favoritePlayers: [{ ...req.body }] } }
      );
      return res.status(200).json({
        status: 200,
        data: result,
        message: "Successfully gotten!",
      });
    }
    let checkPlayer = false;
    let players = user[0].favoritePlayers;
    console.log("apple", user[0]);
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.playerId === playerId) {
        checkPlayer = true;
        break;
      }
    }
    if (checkPlayer) {
      return res.status(400).json({
        status: 400,
        message: "Player is already liked!",
      });
    }
    console.log("banana", players);
    console.log("jalapeno", req.body);
    players.push({ ...req.body });
    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { favoritePlayers: players } }
    );
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully gotten!",
    });
  } catch (err) {
    console.log("Error", err);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

// /api/post/comment
const postComment = async (req, res) => {
  const { comment, player, playerId, user, date, time } = req.body;
  const client = await getMongoClient();

  try {
    const db = await client.db("db-name");
    const reply = await db.collection("comments").insertOne({
      _id: uuidv4(),
      comment: comment,
      player: player,
      playerId: playerId,
      user: user.nickname,
      date: date,
      time: time,
    });
    if (reply.acknowledged) {
      res.status(200).json({
        status: 200,
        data: reply,
        message: "Successfully posted!",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "Comment not found.",
      });
    }
  } catch (err) {
    console.log("Error", err);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

// api/get/comment/:id
const getComments = async (req, res) => {
  const { id } = req.params;
  const number = Number(id);
  console.log("id", typeof number, number);
  const client = await getMongoClient();
  try {
    const db = await client.db("db-name");
    const replies = await db
      .collection("comments")
      .find({ playerId: number })
      .sort({ date: -1, time: -1 })
      .limit(25)
      .toArray();
    if (replies.length >= 0) {
      res.status(200).json({
        status: 200,
        data: replies,
        message: "Successfully posted!",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "Comments not found.",
      });
    }
    console.log("getComments", replies);
  } catch (err) {
    console.log("Error", err);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

module.exports = {
  getPlayer,
  getTeams,
  getATeamInfo,
  getStanding,
  postComment,
  getComments,
  patchProfile,
  getProfile,
  AddToFavourites,
};
