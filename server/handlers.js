"use strict";
const { MongoClient, ObjectId } = require("mongodb");
const axios = require("axios");

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

const getPlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}`
    );
    const playerstats = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=20222023`
    );
    console.log("getPlayer result", result);
    console.group("getPlayer stats", playerstats);

    res.status(200).json({
      status: 200,
      player: result.data,
      stats: playerstats.data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

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

const getRosterByTeams = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`
    );
    const teamInfo = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}`
    );
    console.log("Result", result.data);
    console.log("teamInfo", teamInfo.data);

    res.status(200).json({
      status: 200,
      roster: result.data.roster,
      team: teamInfo.data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: 400,
      data: err,
    });
  }
};

module.exports = { getPlayer, getTeams, getRosterByTeams };
