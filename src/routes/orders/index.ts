import { Router } from 'express';

import { 
    OrdersController,
} from '../../controllers';

import { 
    getOrderValidator,
    createOrderValidator,
    updateOrderValidator,
} from './validators';

const routes = Router();

const { 
    show,
    index, 
    create, 
    update, 
} = new OrdersController();

routes
    .post(
        '/orders',
        createOrderValidator,
        create
    )
    .put(
        '/orders',
        updateOrderValidator,
        update
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
