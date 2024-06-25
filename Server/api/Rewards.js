const express = require("express");
const router = express.Router();
const { Rewards } = require("../model");
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");

