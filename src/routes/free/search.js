import knex from "../../db/db.js";

export async function search(req, res) {
    try {
        if (!req.query.page) req.query.page = 1;
        const search = req.query.request || "";

        const words = await knex("words")
            // .whereIn("words.status", [1, 2])
            .leftJoin("definition", "definition.word", "words.id")
            .select(["words.id", "words.word", "definition.definition"])
            .whereLike("words.word", `%${search}%`);

        const defs = await knex("words")
            // .whereIn("words.status", [1, 2])
            .leftJoin("definition", "definition.word", "words.id")
            .select(["words.id", "words.word", "definition.definition"])
            .whereLike("definition.definition", `%${search}%`);

        const hiss = await knex("words")
            // .whereIn("words.status", [1, 2])
            .leftJoin("history", "history.word", "words.id")
            .select(["words.id", "words.word", "history.history", "history.resource"])
            .whereLike("history.history", `%${search}%`);

        const exas = await knex("words")
            // .whereIn("words.status", [1, 2])
            .leftJoin("example", "example.word", "words.id")
            .select(["words.id", "words.word", "example.phrase", "example.resource"])
            .whereLike("example.phrase", `%${search}%`);

        const data = [...words];
        data.push(...defs.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...hiss.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...exas.filter((e) => !data.find((i) => e.id === i.id)));

        setTimeout(() => {
            res.status(200).json(data);
        }, 500);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
