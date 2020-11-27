import { Router } from 'express';

import { UsersController } from '../../controllers';

import { createUserValidator, updateUserValidator } from './validators';

const routes = Router();

const { create, update } = new UsersController();

routes
    .post(
        '/users', 
        createUserValidator,
        create
    )
    .put(
        '/users',
        updateUserValidator,
        update
    );

export default routes;
