import Joi from "joi";
import knex from "../../db/db.js";

const word = {};

word.get_resources = async (req, res) => {
    try {
        const resources = await knex("resources");
        res.status(200).json(resources);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
