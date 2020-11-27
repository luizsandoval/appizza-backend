import { Router } from 'express';

import { AuthController } from '../../controllers';

import { authenticateValidator } from './validators';

const routes = Router();
const { authenticateUsers, authenticateEstablishments } = new AuthController();

routes
    .post(
        '/auth/users',
        authenticateValidator,
        authenticateUsers
    )
    .post(
        '/auth/establishments',
        authenticateValidator,
        authenticateEstablishments,
    );

export default routes;
