import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('cpf').unique().notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.decimal('latitude');
        table.decimal('longitude');
        table
            .dateTime('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}
