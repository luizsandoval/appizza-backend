import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';

import knex from '../database/connection';

import User from '../models/user.model';

class UsersController {

    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            const user = await knex<User>('users')
                .where('email', email)
                .where('password', password)
                .first();
    
            if (!user) return res.status(403).json({ message: 'Usuário ou senha inválidos' });
    
            const userToken = sign(
                {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    address: user.address,
                    fullName: `${user.name} ${user.surname}`,
                    cpf: user.cpf,
                    email: user.email
                },
                process.env.SECRET_JWT || '',
                {
                    expiresIn: '12h'
                }
            );
    
            return res.status(200).json(userToken);

        } catch(err) {
            return res.status(500).json(err);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user: User = req.body;

            const trx = await knex.transaction();
    
            const insertedUser = await trx<User>('users')
                .insert(user)

            await trx.commit();
    
            return res.status(200).json(insertedUser);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default UsersController;
