import path from 'path';

module.exports = {
    // development: {
    //     client: 'sqlite3',
    //     connection: {
    //         filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    //     },
    //     migrations: {
    //         directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    //     },
    //     useNullAsDefault: true,
    // },
    development: {
        client: 'pg',
        connection: 'postgres://zssuuigwzuzapa:ae892f3c322f4b938efe6282280d41f466401364295d25352d0c3287619c72d2@ec2-54-159-138-67.compute-1.amazonaws.com:5432/dcjdjrcum4e34s',
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        }
    },
    staging: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        }
    },
};
