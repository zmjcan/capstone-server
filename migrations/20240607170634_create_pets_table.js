/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('Pets', (table) => {
        table.increments('id').primary();
        table.string('pet_name').notNullable();
        table.string('pet_type').notNullable();
        table.string('owner_name').notNullable();
        table.string('owner_contact').notNullable();
        table.string('pet_location').nullable();
        table.string('pet_description').nullable();
        table.string('pet_image').nullable();
        table.string('pet_imgalt').nullable();
        table.float('long').nullable();
        table.float('lati').nullable();
        table.string('finder_name').nullable();
        table.string('finder_contact').nullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pets1');
};
