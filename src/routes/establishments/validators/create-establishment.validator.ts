import { celebrate, Joi } from 'celebrate';

import { Establishment } from '../../../models';

import CNPJValidator from '../../../helpers/CNPJValidator';

export default celebrate(
    {
        body: Joi.object<Establishment>()
            .keys(
                {
                    company_name: Joi
                        .string()
                        .required(),
                    fantasy_name: Joi
                        .string()
                        .required(),
                    cnpj: Joi
                        .required()
                        .custom(CNPJValidator),
                    description: Joi
                        .string()
                        .allow('')
                        .max(300),
                    email: Joi
                        .string()
                        .email()
                        .required(),
                    phone: Joi
                        .string()
                        .required(),
                    whatsApp: Joi
                        .string()
                        .required(),
                    latitude: Joi
                        .number()
                        .required(),
                    longitude: Joi
                        .number()
                        .required(),
                    password: Joi
                        .string()
                        .required(),
                },
                
            )
    },
    {
        abortEarly: false
    }
);
