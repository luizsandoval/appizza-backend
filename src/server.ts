import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import expressJwt from 'express-jwt';

import { config } from 'dotenv';
import { errors } from 'celebrate';

import isNonAuthenticatedRoute from './middlewares/isNonAuthenticatedRoute';

import Routes from './routes'; 

if (process.env.NODE_ENV === 'development') {
    const dotenv = config();

    if (dotenv.error) throw new Error(`Error while configuring dotenv, \n Error: ${dotenv.error}`);
}

const authenticate = expressJwt({ secret: process.env.SECRET_JWT || '' })
    .unless(({ originalUrl }) => isNonAuthenticatedRoute(originalUrl));

const app = express();

app.use(cors());

app.use(errors());

app.use(authenticate);

app.use(morgan('dev'));

app.use(express.json());

app.use(Routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(process.env.PORT, () => console.log(`Server is listening on PORT ${process.env.PORT}`));
