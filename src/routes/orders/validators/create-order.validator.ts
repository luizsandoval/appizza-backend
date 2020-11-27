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
    },
    {
        abortEarly: false
    }
);
