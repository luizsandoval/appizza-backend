import { celebrate, Joi } from 'celebrate';

import { Pizza } from '../../../models';

export default celebrate(
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
                        .allow('')
                        .max(30),
                    price: Joi
                        .number()
                        .positive()
                        .required()
                }
            )
    },
    {
        abortEarly: false
    }
);
