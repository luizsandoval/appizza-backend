import path from 'path';

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
        useNullAsDefault: true,
    },
    staging: {
        client: 'pg',
        connection: process.env.POSTGRES_URL,
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        }
    },
    production: {
        client: 'pg',
        connection: process.env.POSTGRES_URL,
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        }
    },
};
