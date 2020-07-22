/* eslint-disable no-console */
const express = require('express');
const { connectToDB } = require('./db');
const { installHandler } = require('./api_handler');
require('dotenv').config();

const app = express();

installHandler(app);

const PORT = process.env.API_SERVER_PORT || 3000;
(async function main() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }
}());
