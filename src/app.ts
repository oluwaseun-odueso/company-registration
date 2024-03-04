import express, { Express, Request, Response } from "express";
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
