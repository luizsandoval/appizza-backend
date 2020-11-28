import Knex from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable('establishments', (table) => {
            table
                .increments('id')
                .primary();
            table
                .string('company_name')
                .notNullable();
            table
                .string('fantasy_name')
                .notNullable();
            table
                .string('description')
                .nullable();
            table
                .string('cnpj')
                .unique()
                .notNullable();
            table
                .string('phone')
                .notNullable();
            table
                .string('whatsApp')
                .notNullable();
            table
                .decimal('latitude')
                .notNullable();
            table
                .decimal('longitude')
                .notNullable();
            table
                .string('email')
                .notNullable();
            table
                .string('password')
                .notNullable();
            table
                .string('main_color');
            table
                .string('logo_image');
            table
                .dateTime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now());
    });
};

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable('establishments');
};
