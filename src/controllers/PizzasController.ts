import { Request, Response } from 'express';

import knex from '../database/connection';

import Pizza from '../models/pizza.model';

class PizzasController {

    async index(req: Request, res: Response) {
        try {
            const pizzas = await knex<Pizza>('pizzas')
                .where('active', true);

            const serializedPizzas = pizzas
                .map(pizza => (
                    {
                        ...pizza,
                        image: `${process.env.IMAGES_URL}/${pizza?.image}`
                    }
                ));
    
            return res.status(200).json(serializedPizzas);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const pizza = await knex<Pizza>('pizzas')
                .where('id', id)
                .first();
    
            const serializedPizza = {
                ...pizza,
                image: `${process.env.IMAGES_URL}/${pizza?.image}`
            };
    
            return res.status(200).json(serializedPizza);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const pizza: Pizza = req.body;

            pizza.image = req.file.filename;

            const trx = await knex.transaction();
    
            const insertedPizza = await trx<Pizza>('pizzas')
                .insert(pizza, '*');

            await trx.commit();

            return res.status(200)
                .json(
                    {
                        id: insertedPizza[0],
                        ...pizza,
                        image: `${process.env.IMAGES_URL}/${pizza?.image}`,
                    }
                );

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const pizza: Pizza = req.body;

            pizza.image = req.file.filename;

            const trx = await knex.transaction();
    
            await trx<Pizza>('pizzas')
                .update(pizza, '*')
                .where('id', pizza.id);

            await trx.commit();
    
            return res.status(200)
                .json(
                    {
                        ...pizza,
                        image: `${process.env.IMAGES_URL}/${pizza?.image}`,
                    }
                );

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const trx = await knex.transaction();
    
            const removedPizza = await trx<Pizza>('pizzas')
                .update('active', false)
                .where('id', id);

            await trx.commit();
    
            return res.status(200).json(removedPizza);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default PizzasController;
