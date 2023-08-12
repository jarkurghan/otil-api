import Joi from "joi";
import knex from "../../db/db.js";

const word = {};
word.create_word = async (req, res) => {
  try {
    const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);
    const word = await knex("words").insert({ word: req.body.word, created_by: req.user.id }, "*");
    res.status(201).json(word[0].id);
  } catch (error) {
    console.log(error);
    res.status(500).json("an error occurred");
  }
};

word.new_word = async (req, res) => {
  try {
    const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);
    const words = await knex("words").where(req.body);
    if (words.length === 0) return res.status(200).json("not found");
    res.status(200).json(words);
  } catch (error) {
    console.log(error);
    res.status(500).json("an error occurred");
  }
};

export default word;
