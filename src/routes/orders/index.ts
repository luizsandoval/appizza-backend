import { Router } from 'express';

import { 
    OrdersController,
} from '../../controllers';

import { 
    getOrderValidator,
    createOrderValidator, 
} from './validators';

const routes = Router();

const { create, index, show } = new OrdersController();

routes
    .post(
        '/orders',
       createOrderValidator,
        create
    )
    .get(
        '/orders',
        index
    )
    .get(
        '/orders/:id',
        getOrderValidator,
        show
    );

export default routes;
