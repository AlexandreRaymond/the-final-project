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

const getPlayer = async (req, res) => {};

const getConference = async (req, res) => {
  try {
    const result = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams/1/roster`
    );
    console.log("Result", result.data);

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

module.exports = { getPlayer, getConference };
