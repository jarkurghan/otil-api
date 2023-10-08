import Joi from "joi";
import knex from "../../db/db.js";

const word = {};
word.get_languages = async (req, res) => {
    try {
        const languages = await knex("languages");
        res.status(200).json(languages);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.get_word_types = async (req, res) => {
    try {
        const word_types = await knex("word_type").where({ language: req.params.id });
        res.status(200).json(word_types);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};
word.add_languages = async (req, res) => {
    try {
        // validation
        // check 
        // write

        await knex("languages").insert(req.body);
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.add_word_types = async (req, res) => {
    try {
        await knex("word_type").insert(req.body);
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
