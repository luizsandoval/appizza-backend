import express from 'express';
import multer from 'multer';

import { celebrate, Joi } from 'celebrate';

import multerConfig from './config/multer';

import CPFValidator from './helpers/CPFValidator';

import Pizza from './models/pizza.model';
import Order from './models/order.model';

import UsersController from './controllers/UsersController';
import PizzasController from './controllers/PizzasController';
import OrdersController from './controllers/OrdersController';

const routes = express.Router();
const upload = multer(multerConfig);

// region users

const usersController = new UsersController();

routes
    .post(
        '/users', 
        celebrate(
            {
                body: Joi.object()
                    .keys(
                        {
                            name: Joi
                                .string()
                                .required(),
                            surname: Joi
                                .string()
                                .required(),
                            email: Joi
                                .string()
                                .required()
                                .email(),
                            password: Joi
                                .string()
                                .required(),
                            cpf: Joi
                                .string()
                                .required()
                                .custom(CPFValidator),
                            address: Joi
                                .string()
                                .required(),
                        }
                    )
            },
            {
                abortEarly: false
            }
        ),
        usersController.create
    );

routes
    .post(
        '/signIn',
        celebrate(
            {
                body: Joi.object()
                    .keys(
                        {
                            email: Joi
                                .string()
                                .required(),
                            password: Joi
                                .string()
                                .required()
                        }
                    )
            }
        ),
        usersController.authenticate
    );
// endregion

// region pizzas

const pizzasController = new PizzasController();

routes
    .post(
        '/pizzas',
        celebrate(
            {
                body: Joi.object<Pizza>()
                    .keys(
                        {
                            name: Joi
                                .string()
                                .required(),
                            ingredients: Joi
                                .string()
                                .required(),
                            price: Joi
                                .number()
                                .positive()
                                .required(),
                            description: Joi
                                .string()
                                .max(30),
                            image: Joi
                                .string()
                                .required()
                        }
                    )
            }
        ),
        upload.single('image'),
        pizzasController.create
    )
    .put(
        '/pizzas',
        celebrate(
            {
                body: Joi.object<Pizza>()
                    .keys(
                        {
                            id: Joi
                                .number()
                                .required(),
                            name: Joi
                                .string()
                                .required(),
                            ingredients: Joi
                                .string()
                                .required(),
                            description: Joi
                                .string()
                                .max(30),
                            price: Joi
                                .number()
                                .positive()
                                .required(),
                            image: Joi
                                .string()
                                .required()
                        }
                    )
            }
        ),
        pizzasController.destroy
    )
    .delete(
        '/pizzas/:id',
        celebrate(
            {
                params: {
                    id: Joi
                        .number()
                        .required()
                }
            }
        )
    )
    .get(
        '/pizzas',
        pizzasController.index
    )
    .get(
        '/pizzas/:id',
        celebrate(
            {
                params: {
                    id: Joi
                        .number()
                        .required()
                }
            }
        ),
        pizzasController.show
    );
// endregion

// region orders

const ordersController = new OrdersController();

routes
    .post(
        '/orders',
        celebrate(
            {
                body: Joi.object<Order>(
                    {
                        total: Joi
                            .number()
                            .positive()
                            .required(),
                        address: Joi
                            .string()
                            .required(),
                        user_id: Joi
                            .number()
                            .positive()
                            .required(),
                        pizza_ids: Joi
                            .array()
                            .items(Joi.number().positive())
                            .required()
                    }
                )
            }
        ),
        ordersController.create
    )
    .get(
        '/orders',
        ordersController.index
    )
    .get(
        '/orders/:id',
        celebrate(
            {
                params: {
                    id: Joi
                        .number()
                        .positive()
                        .required()
                }
            }
        ),
        ordersController.show
    );
// endregion

export default routes;