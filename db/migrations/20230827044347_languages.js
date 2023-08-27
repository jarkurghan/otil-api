/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("languages", function (table) {
            table.increments("id").primary();
            table.string("language").notNullable();
            table.string("description");
        })
        .createTable("word_type", function (table) {
            table.increments("id").primary();
            table.string("type").notNullable();
            table.integer("language").notNullable();
            table.foreign("language").references("id").inTable("languages");
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("word_type").dropTable("languages");
}
