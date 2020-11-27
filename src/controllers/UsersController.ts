import { Response, Request } from 'express';

import knex from '../database/connection';

import User from '../models/user.model';

import { encryptPassword } from '../helpers/passwordEncryptor';

class UsersController {
    async create(req: Request, res: Response) {
        try {
            const user: User = req.body;

            user.password = await encryptPassword(user.password); 

            const trx = await knex.transaction();
    
            const insertedUser = await trx<User>('users')
                .insert(user)

            await trx.commit();
    
            return res.status(200).json(insertedUser);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {
                id,
                cpf,
                email,
                latitude,
                longitude,
                first_name,
                last_name,
            } = req.body;

            const user = {
                id,
                cpf,
                email,
                latitude,
                longitude,
                first_name,
                last_name, 
            };

            const trx = await knex.transaction();
    
            const updatedUser = await trx<User>('users')
                .update(user, '*')
                .where('id', user.id);

            await trx.commit();
    
            return res.status(200).json(updatedUser);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default UsersController;
