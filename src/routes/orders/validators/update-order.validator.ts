import { celebrate, Joi } from 'celebrate';

import { Order } from '../../../models';

export default celebrate(
    {
        body: Joi.object<Order>(
            {
                id: Joi
                    .number()
                    .positive()
                    .required(),
                total: Joi
                    .number()
                    .positive(),
                user_id: Joi
                    .number()
                    .positive(),
                establishment_id: Joi
                    .number()
                    .positive(),
                pizzas: Joi
                    .array(),
                finished: Joi
                    .boolean(),
                payment_term: Joi
                    .string(),
            }
        )
    },
    {
        abortEarly: false
    }
);
