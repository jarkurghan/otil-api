import knex from "../../db/db.js";

export async function search(req, res) {
    try {
        if (!req.query.page) req.query.page = 1;
        const search = req.query.request || "";

        const results = { words: [], defs: [], hiss: [], exas: [], syns: [] };
        const promises = [];
        if (req.query.args?.includes("word"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.words = await knex("words")
                            .where("words.status", 2)
                            .leftJoin("definition", "definition.word", "words.id")
                            .select(["words.id", "words.word", "definition.definition"])
                            .whereLike("words.word", `%${search}%`);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        if (req.query.args?.includes("definition"))
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

        if (req.query.args?.includes("history"))
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

        if (req.query.args?.includes("resource"))
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

        if (req.query.args?.includes("synonym"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.syns = await knex("words")
                            .where("words.status", 4)
                            .leftJoin("synonym", "synonym.synonym", "words.id")
                            .leftJoin("words as word", "word.id", "synonym.word")
                            .select(["words.id", "words.word", "word.word as definition"])
                            .whereLike("words.word", `%${search}%`);
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
        data.push(...results.syns.filter((e) => !data.find((i) => e.id === i.id)));

        setTimeout(() => {
            res.status(200).json(data);
        }, 500);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
