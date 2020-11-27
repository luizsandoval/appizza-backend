import { celebrate, Joi } from 'celebrate';

import CPFValidator from '../../../helpers/CPFValidator';

export default celebrate(
    {
        body: Joi.object()
            .keys(
                {
                    id: Joi
                        .number()
                        .positive()
                        .required(),
                    first_name: Joi
                        .string(),
                    last_name: Joi
                        .string(),
                    email: Joi
                        .string()
                        .email(),
                    password: Joi
                        .string(),
                    cpf: Joi
                        .string()
                        .custom(CPFValidator),
                    latitude: Joi
                        .number(),
                    longitude: Joi
                        .number(),
                }
            )
    },
    {
        abortEarly: false
    }
);
