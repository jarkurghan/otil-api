/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    const user = await knex("users")
        .insert({
            email: "jarkurghan@gmail.com",
            phone: "+998772590100",
            password: "$2b$10$/Sbl7HipVpOe80xzniyvquqqdYJVOSX33jX4PNpLjghm9aQVJZgiy",
            user_id: "lu0000",
            first_name: "Najmiddin",
            last_name: "Nazirov",
        })
        .returning("*");

    // const word = await knex("words")
    //     .insert({
    //         word: "humpar",
    //         created_by: user[0].id,
    //     })
    //     .returning("*");

    // await knex("synonym").insert({
    //     word: word[0].id,
    //     synonym: "mushukcha",
    //     level: 5,
    // });

    // await knex("definition").insert({
    //     word: word[0].id,
    //     definition: "mushukning bolasi",
    // });

    // await knex("history_of_actions").insert([
    //     {
    //         word: word[0].id,
    //         user: user[0].id,
    //         action: "so'z bazaga qo'shildi",
    //     },
    //     {
    //         word: word[0].id,
    //         user: user[0].id,
    //         action: "sinonim qo'shildi: mushukcha",
    //     },
    //     {
    //         word: word[0].id,
    //         user: user[0].id,
    //         action: "ta'rif yozildi: mushukning bolasi",
    //     },
    // ]);
}
