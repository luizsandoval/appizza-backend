import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('address').notNullable();
        table.string('cpf').unique().notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table
            .dateTime('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}
