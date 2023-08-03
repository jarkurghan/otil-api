/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("word_status", function (table) {
      table.increments("id").primary();
      table.string("status").notNullable();
      table.string("description");
    })
    .createTable("source_type", function (table) {
      table.increments("id").primary();
      table.string("type").notNullable();
      table.string("description");
    })
    .createTable("word_type", function (table) {
      table.increments("id").primary();
      table.string("type").notNullable();
    })
    .createTable("view_level", function (table) {
      table.increments("id").primary();
      table.string("level").notNullable();
    })
    .createTable("words", function (table) {
      table.increments("id").primary();
      table.string("word").notNullable();
      table.integer("status").defaultTo(1).notNullable();
      table.foreign("status").references("id").inTable("word_status");
      table.integer("created_by").notNullable();
      table.foreign("created_by").references("id").inTable("users");
      table.date("created_date").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("history", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("history").notNullable();
      //   table.integer("created_by").notNullable();
      //   table.foreign("created_by").references("id").inTable("users");
      //   table.datetime("date").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("example", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("phrase").notNullable();
      table.string("word_position").notNullable();
    })
    .createTable("synonym", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("synonym").notNullable();
      table.integer("level").notNullable();
    })
    .createTable("definition", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("definition").notNullable();
      table.integer("resource"); // ?
    })
    .createTable("images", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.uuid("image").notNullable();
    })
    .createTable("source", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.integer("type").notNullable();
      table.foreign("type").references("id").inTable("source_type");
    })
    .createTable("type", function (table) {
      table.increments("id").primary();
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.integer("type").notNullable();
      table.foreign("type").references("id").inTable("word_type");
    })
    .createTable("comment", function (table) {
      table.increments("id").primary();
      table.integer("user").notNullable();
      table.foreign("user").references("id").inTable("users");
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("comment").notNullable();
      table.datetime("date").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("view", function (table) {
      table.increments("id").primary();
      table.integer("user").notNullable();
      table.foreign("user").references("id").inTable("users");
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.integer("level").notNullable();
      table.foreign("level").references("id").inTable("view_level");
    })
    .createTable("history_of_actions", function (table) {
      table.increments("id").primary();
      table.integer("user").notNullable();
      table.foreign("user").references("id").inTable("users");
      table.integer("word").notNullable();
      table.foreign("word").references("id").inTable("words");
      table.string("action").notNullable();
      table.datetime("date").defaultTo(knex.fn.now()).notNullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable("history_of_actions")
    .dropTable("view")
    .dropTable("comment")
    .dropTable("type")
    .dropTable("source")
    .dropTable("images")
    .dropTable("definition")
    .dropTable("synonym")
    .dropTable("example")
    .dropTable("history")
    .dropTable("words")
    .dropTable("view_level")
    .dropTable("word_type")
    .dropTable("source_type")
    .dropTable("word_status");
}
