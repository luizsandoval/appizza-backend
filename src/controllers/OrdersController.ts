import { Request, Response } from 'express';

import knex from '../database/connection';
import Order from '../models/order.model';

interface CreateOrderRequest {
    user_id: number;
    pizza_ids: number[]; 
    total: number;
    address: string;
}

class OrdersController {
    async create(req: Request, res: Response) {
        try {
            const { user_id, pizza_ids, total, address }: CreateOrderRequest = req.body;                
        
            const trx = await knex.transaction();
    
            const order = {
                user_id,
                total,
                address
            };  

            const insertedOrder = await trx<Order>('orders')
                .insert(order);
            
            const order_id = insertedOrder[0];
            
            const ordersPizzas = pizza_ids
                .map(pizza_id => (
                    {
                        pizza_id,
                        order_id
                    }
                ));

            await trx('orders_pizzas')
                .insert(ordersPizzas);

            await trx.commit();
    
            return res.status(200).json(
                {
                    id: order_id,
                    ...order
                }
            );

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const orders: Order[] = await knex<Order>('orders as o')
                .join('users as u', 'u.id', '=', 'o.user_id')
                .select(
                    'o.id as id',
                    'u.name as firstname', 
                    'u.surname as lastname',
                    'o.total as total',
                    'o.address as address',
                    'o.created_at as created_at'
                )
                .orderBy('o.id', 'desc');

            const ordersIds = orders.map((order) => order.id);

            const ordersItems = await knex('orders_pizzas as op')
                .whereIn('op.order_id', ordersIds)
                .join('pizzas as p', 'p.id', '=', 'op.pizza_id')
                .select(
                    'p.id as id',
                    'p.name as name',
                    'p.ingredients as ingredients',
                    'p.price as price',
                    'op.order_id as order_id'
                );

            const serializedOrders = orders.map(order => (
                {
                    ...order,
                    pizzas: ordersItems.filter(item => item.order_id === order.id)
                }
            ));

            return res.status(200).json(serializedOrders);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const order: Order = await knex<Order>('orders as o')
                .where('o.id', id)
                .join('users as u', 'u.id', '=', 'o.user_id')
                .select(
                    'o.id as id',
                    'o.total as total',
                    'o.created_at as created_at',
                    'u.name as firstname', 
                    'u.surname as lastname',
                )
                .first();

            const orderItems = await knex('orders_pizzas as op')
                .where('op.order_id', id)
                .join('pizzas as p', 'p.id', '=', 'op.pizza_id')
                .select(
                    'p.name as name', 
                    'p.price as price',
                    'p.ingredients as ingredients',
                    'p.image as image'
                );

            const serializedOrder = {
                ...order,
                pizzas: orderItems.map(item => (
                    {
                        ...item,
                        image: `${process.env.IMAGES_URL}/${item.image}`,
                    }
                ))
            };

            return res.status(200).json(serializedOrder);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default OrdersController;
