import { Router } from 'express';

import AuthRoutes from './auth';
import UsersRoutes from './users';
import OrdersRoutes from './orders';
import PizzasRoutes from './pizzas';
import EstablishmentRoutes from './establishments';

const routes = Router();

routes
    .use(AuthRoutes)
    .use(UsersRoutes)
    .use(PizzasRoutes)
    .use(OrdersRoutes)
    .use(EstablishmentRoutes);

export default routes;
