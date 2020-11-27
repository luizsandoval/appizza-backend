import { celebrate, Joi } from 'celebrate';

import { Pizza } from '../../../models';

export default celebrate(
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
                        .allow('')
                        .max(30),
                    establishment_id: Joi
                        .number()
                        .required()
                },
                
            )
    },
    {
        abortEarly: false
    }
);
