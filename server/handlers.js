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

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate;

console.log("today is", date);

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

const getStanding = async (req, res) => {
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/standings?season=20032004&date=2018-01-14`
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

module.exports = { getPlayer, getTeams, getATeamInfo, getStanding };
