import { celebrate, Joi } from 'celebrate';

import { Order } from '../../../models';

const PAYMENT_TERMS = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];

export default celebrate(
    {
        body: Joi.object<Order>(
            {
                total: Joi
                    .number()
                    .positive()
                    .required(),
                user_id: Joi
                    .number()
                    .positive()
                    .required(),
                establishment_id: Joi
                    .number()
                    .positive()
                    .required(),
                pizzas: Joi
                    .array()
                    .required(),
                payment_term: Joi
                    .string()
                    .required()
                    .equal(PAYMENT_TERMS)
            }
        )
    },
    {
        abortEarly: false
    }
);
