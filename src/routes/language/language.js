import knex from "../../db/db.js";
import createLanguage from "../../validations/models/create-language.js";
import idParameter from "../../validations/models/id-parameter.js";

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
        const validation = idParameter.validate(req.params);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });
        const word_types = await knex("word_type").where({ language: req.params.id });
        res.status(200).json(word_types);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.add_language = async (req, res) => {
    try {
        const validation = createLanguage.validate(req.body);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        // validation
        // check
        // write
        console.log(req.user);

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
