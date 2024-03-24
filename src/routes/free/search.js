import knex from "../../db/db.js";

export async function search(req, res) {
    try {
        if (!req.query.page) req.query.page = 1;
        const search = req.query.request || "";

        const words = await knex("words")
            .whereIn("words.status", [1, 2])
            .leftJoin("definition", "definition.word", "words.id")
            .leftJoin("users", "words.created_by", "users.id")
            .leftJoin("word_status", "words.status", "word_status.id")
            .leftJoin(knex("comment").select("word", knex.raw("count(*) as comments")).groupBy("word").as("x"), "x.word", "words.id")
            .leftJoin(knex("view").select("word", knex.raw("count(*) as views")).groupBy("word").as("y"), "y.word", "words.id")
            .select(["words.id", "words.word", "definition.definition", "x.comments", "y.views", "word_status.status", "first_name", "last_name"])
            .orderBy("words.status")
            .orderBy("words.id")
            .offset((req.query.page - 1) * 20)
            .limit(20);

        setTimeout(() => {
            res.status(200).json(words);
        }, 500);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
