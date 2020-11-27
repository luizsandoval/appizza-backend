import { celebrate, Joi } from 'celebrate';

import { Establishment } from '../../../models';

import CNPJValidator from '../../../helpers/CNPJValidator';

export default celebrate(
    {
        body: Joi.object<Establishment>()
            .keys(
                {
                    id: Joi
                        .number()
                        .positive()
                        .required(),
                    company_name: Joi
                        .string()
                        .required(),
                    fantasy_name: Joi
                        .string()
                        .required(),
                    cnpj: Joi
                        .number()
                        .positive()
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
                        .required()
                },
                
            )
    },
    {
        abortEarly: false
    }
);
