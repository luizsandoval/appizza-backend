import { celebrate, Joi } from 'celebrate';

export default celebrate(
    {
        params: {
            id: Joi
                .number()
                .required()
        }
    },
    {
        abortEarly: false
    }
);
