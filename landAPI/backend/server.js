//express
const express = require("express");
const app = express();
const port = 3000;

//joi
const Joi = require("joi");

//cors
const cors = require("cors");

//env
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//Database
const mysql = require("mysql2");

//schema
const countrySchema = Joi.object({
  country: Joi.string().required(),
  capital: Joi.string().required(),
  language: Joi.string().required(),
  population: Joi.number().positive().required(),
  securityKey: Joi.string().required(),
});

const deleteSchema = Joi.object({
  country: Joi.string().required(),
  securityKey: Joi.string().required(),
});

const getSchema = Joi.object({
  country: Joi.string().required(),
});

const dataBase = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

const pool = mysql.createPool(dataBase);

/* endpoints */

/* get country */
app.post("/getCountry", (req, res) => {
  const { error, value } = getSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { country } = value;

  const sql = "SELECT * from countries WHERE country = ?";

  pool.execute(sql, [country], (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    if (result.length === 0) {
      res.status(404).send("Country not found");
    } else {
      res.status(200).send(result);
    }
  });
});

/* add country */
app.post("/addCountry", (req, res) => {
  const { error, value } = countrySchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { securityKey, country, capital, language, population } = value;
  const originalKey = process.env.securityKey;

  if (securityKey !== originalKey) {
    return res.status(401).send("Invalid security-key");
  }

  const sql =
    "INSERT INTO countries (country, capital, language, population) VALUES (?, ?, ?, ?)";

  pool.execute(sql, [country, capital, language, population], (err, result) => {
    if (err) {
      res.status(500).send("Error adding country to database");
    } else {
      res.status(201).send("Country added successfully");
    }
  });
});

/* update */

app.post("/updateCountry", (req, res) => {
  const { error, value } = countrySchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { securityKey, country, capital, language, population } = value;
  const originalKey = process.env.securityKey;

  if (securityKey !== originalKey) {
    return res.status(401).send("Invalid security-key");
  }

  const sql =
    "UPDATE countries SET capital = ?, language = ?, population = ? WHERE country = ?";

  pool.execute(sql, [capital, language, population, country], (err, result) => {
    if (err) {
      res.status(500).send("Error updating country in database");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("Country updated successfully");
      } else {
        res.status(404).send("Country not found in database");
      }
    }
  });
});

/* delete */

app.post("/deleteCountry", (req, res) => {
  const { error, value } = deleteSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { country, securityKey } = value;
  const originalKey = process.env.securityKey;

  if (securityKey !== originalKey) {
    return res.status(401).send("Invalid security-key");
  }

  const sql = "DELETE FROM countries WHERE country = ?";

  pool.execute(sql, [country], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting country in database");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("Country delete successfully");
      } else {
        res.status(404).send("Country not found in database");
      }
    }
  });
});

app.listen(port);
