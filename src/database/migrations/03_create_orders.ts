import Knex from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable('orders', (table) => {
            table
                .increments('id')
                .primary();
            table
                .decimal('total')
                .notNullable();
            table
                .string('payment_term')
                .notNullable();
            table
                .boolean('finished')
                .notNullable()
                .defaultTo(false);
            table
                .integer('establishment_id')
                .notNullable()
                .references('id')
                .inTable('establishments')
            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users');
            table
                .dateTime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime('finished_at')
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('orders');
};
