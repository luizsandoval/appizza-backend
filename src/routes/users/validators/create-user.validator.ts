import { celebrate, Joi } from 'celebrate';

import CPFValidator from '../../../helpers/CPFValidator';

export default celebrate(
    {
        body: Joi.object()
            .keys(
                {
                    first_name: Joi
                        .string()
                        .required(),
                    last_name: Joi
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
                }
            )
    },
    {
        abortEarly: false
    }
);
