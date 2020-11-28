import { Request, Response } from 'express';

import knex from '../database/connection';

import { 
    Establishment, Pizza,
} from '../models';

import { encryptPassword } from '../helpers/passwordEncryptor';

class EstablishmentsController {
    async create(req: Request, res: Response) {
        try {
            const establishment: Establishment = req.body;

            establishment.password = await encryptPassword(establishment.password);
        
            const trx = await knex.transaction();

            const insertedEstablishment = await trx<Establishment>('establishments')
                .insert(establishment, '*');
            
            await trx.commit();
    
            return res.status(200).json(
                {
                    id: insertedEstablishment[0],
                    ...establishment,
                },
            );

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const establishment: Establishment = req.body;                

            const trx = await knex.transaction();

            const updatedEstablishment = await trx<Establishment>('establishments')
                .update(establishment, '*')
                .where('id', establishment.id);
            
            await trx.commit();
    
            return res.status(200).json(
                {
                    id: updatedEstablishment[0],
                    ...establishment,
                },
            );

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async index(req: Request | any, res: Response) {
        try {
            const establishments = await knex<Establishment>('establishments')
                .select(
                    'id',
                    'fantasy_name as name',
                    'latitude',
                    'longitude',
                );

            return res.status(200).json(establishments);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const establishment = await knex<Establishment>('establishments')
                .where('id', id)
                .select(
                    'id',
                    'cnpj',
                    'company_name',
                    'fantasy_name as name',
                    'email',
                    'phone',
                    'whatsApp',
                    'description',
                    'latitude',
                    'longitude',
                )
                .first();

            const pizzas = await knex<Pizza>('pizzas')
                .where('establishment_id', id)
                .where('active', true);

            establishment.pizzas = pizzas.map(pizza => (
                {
                    ...pizza,
                    image: `${process.env.IMAGES_URL}/${pizza?.image}`
                }
            ));

            return res.status(200).json(establishment);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default EstablishmentsController;
