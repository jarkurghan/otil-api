import Joi from "joi";
import knex from "../../db/db.js";

export async function wordInfo(req, res) {
    try {
        const validation = Joi.object({ word: Joi.string().required() }).validate(req.params);
        if (validation.error) return res.status(400).json({ message: "something went wrong" });

        const search = req.params.word || "";

        const data = await knex("words")
            .where("words.word", search)
            .leftJoin("users", "words.created_by", "users.id")
            .leftJoin("word_type", "word_type.id", "words.word_type")
            .leftJoin("languages", "languages.id", "word_type.language")
            .leftJoin("word_status", "words.status", "word_status.id")
            .select({
                word: "words.*",
                language_id: "languages.id",
                language: "languages.language",
                word_type_id: "word_type.id",
                word_type: "word_type.type",
                status_id: "word_status.id",
                status: "word_status.status",
                first_name: "users.first_name",
                last_name: "users.last_name",
            })
            .first();
        if (!data) return res.status(404).json({ message: "word not found" });

        console.log(data);
        
        data.definition = await knex("definition")
            .where("definition.word", data.id)
            .leftJoin("resources", "resources.id", "definition.resource")
            .select(["definition.*", "resources.name as resource_name"])
            .first();
        data.example = await knex("example")
            .where("example.word", data.id)
            .leftJoin("resources", "resources.id", "example.resource")
            .select(["example.*", "resources.name as resource_name"])
            .first();
        data.history = await knex("history")
            .where("history.word", data.id)
            .leftJoin("resources", "resources.id", "history.resource")
            .select(["history.*", "resources.name as resource_name"])
            .first();
        data.synonyms = await knex("synonym")
            .where("synonym.word", data.id)
            .leftJoin("words", "synonym.synonym", "words.id")
            .select(["synonym.id", "words.word"]);

        // data.comment = await knex("comment").select(knex.raw("count(*)")).where("word", data.id).first();
        data.view = await knex("view").select(knex.raw("count(*)")).where("word", data.id).first();

        if (!data.definition) data.definition = {};
        if (!data.example) data.example = {};
        if (!data.history) data.history = {};

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
