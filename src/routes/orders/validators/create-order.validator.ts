import { celebrate, Joi } from 'celebrate';

import { Order } from '../../../models';

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
            }
        )
    },
    {
        abortEarly: false
    }
);
