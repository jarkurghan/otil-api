import knex from "../../db/db.js";

export async function search(req, res) {
    try {
        if (!req.query.page) req.query.page = 1;
        const search = req.query.request || "";

        const results = { words: [], defs: [], hiss: [], exas: [] };
        const promises = [];

        promises.push(
            new Promise(async (resolve, reject) => {
                try {
                    results.words = await knex("words")
                        // .whereIn("words.status", [1, 2])
                        .leftJoin("definition", "definition.word", "words.id")
                        .select(["words.id", "words.word", "definition.definition"])
                        .whereLike("words.word", `%${search}%`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        );

        promises.push(
            new Promise(async (resolve, reject) => {
                try {
                    results.defs = await knex("words")
                        // .whereIn("words.status", [1, 2])
                        .leftJoin("definition", "definition.word", "words.id")
                        .select(["words.id", "words.word", "definition.definition"])
                        .whereLike("definition.definition", `%${search}%`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        );

        promises.push(
            new Promise(async (resolve, reject) => {
                try {
                    results.hiss = await knex("words")
                        // .whereIn("words.status", [1, 2])
                        .leftJoin("history", "history.word", "words.id")
                        .select(["words.id", "words.word", "history.history", "history.resource"])
                        .whereLike("history.history", `%${search}%`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        );

        promises.push(
            new Promise(async (resolve, reject) => {
                try {
                    results.exas = await knex("words")
                        // .whereIn("words.status", [1, 2])
                        .leftJoin("example", "example.word", "words.id")
                        .select(["words.id", "words.word", "example.phrase", "example.resource"])
                        .whereLike("example.phrase", `%${search}%`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        );

        await Promise.all(promises);

        const data = [...results.words];
        data.push(...results.defs.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...results.hiss.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...results.exas.filter((e) => !data.find((i) => e.id === i.id)));

        setTimeout(() => {
            res.status(200).json(data);
        }, 500);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
