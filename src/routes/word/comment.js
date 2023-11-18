import Joi from "joi";
import knex from "../../db/db.js";

const comment = {};
comment.create = async (req, res) => {
    try {
        // const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
        // if (validation.error) return res.status(400).json(validation.error.details[0].message);
        const data = { word: req.params.id, comment: req.body.comment, user: req.user.id };
        if (req.body.reply) data.reply = req.body.reply;
        const word = await knex("comment").insert(data, "*");
        res.status(201).json(word[0].id);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

comment.get = async (req, res) => {
    try {
        const comments = await knex("comment")
            .where("word", req.params.id)
            .leftJoin("users", "users.id", "comment.user")
            .leftJoin(knex.select("comment").from("comment_like").where("dislike", false).count().groupBy("comment").as("likes"), "likes.comment", "comment.id")
            .leftJoin(
                knex.select("comment").from("comment_like").where("dislike", true).count().groupBy("comment").as("dislikes"),
                "dislikes.comment",
                "comment.id"
            )
            .leftJoin("comment_like as class", function () {
                this.on("class.comment", "comment.id");
                this.andOn("class.user", req.user.id);
            })
            .select([
                "comment.*",
                "users.first_name",
                "users.last_name",
                "users.user_id",
                "likes.count as like",
                "dislikes.count as dislike",
                "class.dislike as classable",
            ]);
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

comment.like = async (req, res) => {
    try {
        // const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
        // if (validation.error) return res.status(400).json(validation.error.details[0].message);
        const data = { word: req.params.id, comment: req.body.comment, user: req.user.id };
        if (req.body.reply) data.reply = req.body.reply;
        const word = await knex("comment").insert(data, "*");
        res.status(201).json(word[0].id);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

(async () => {
    console.log(await knex.select("comment").from("comment_like").whereIn("comment", [2, 6]).count().groupBy("comment"));
})();

export default comment;
