import Knex from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable('orders_pizzas', table => {
            table
                .integer('order_id')
                .notNullable()
                .references('id')
                .inTable('orders');

            table
                .integer('pizza_id')
                .notNullable()
                .references('id')
                .inTable('pizzas');
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable('orders_pizzas');
}
