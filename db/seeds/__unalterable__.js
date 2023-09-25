/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
    await knex("user_status").insert([{ status: "active" }, { status: "deactive" }, { status: "delete" }]);

    await knex("avatar_status").insert([{ status: "active" }, { status: "deactive" }, { status: "delete" }]);

    await knex("action").insert([{ action: "view_word_history" }, { action: "view_word_full_history" }, { action: "setting_of_user_activate" }]);

    await knex("word_status").insert([
        {
            status: "new",
            description: "yangi so'z",
        },
        {
            status: "consideration",
            description: "muhokama jarayonida",
        },
        {
            status: "unsatisfied",
            description: "ko'rib chiqilgan va noto'g'ri deb topilgan",
        },
        {
            status: "active",
            description: "active",
        },
        {
            status: "remove",
            description: "jamoatchilik e'tiroziga ko'ra olib tashlangan",
        },
    ]);

    await knex("source_type").insert([{ type: "definition" }, { type: "example" }, { type: "history" }]);

    // await knex("word_type").insert([
    //   { type: "ot" },
    //   { type: "son" },
    //   { type: "sanoq son" },
    //   { type: "chama son" },
    //   { type: "sifat" },
    //   { type: "va boshqalar" },
    // ]);

    await knex("view_level").insert([
        { level: "ko'rgan" },
        { level: "to'liq ko'rgan" },
        { level: "noto'g'ri deb hisoblagan" },
        { level: "comment yozgan" },
        { level: "qo'llab quvvatlagan" },
    ]);
}
