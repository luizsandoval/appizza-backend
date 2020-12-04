import { Request, Response } from 'express';

import knex from '../database/connection';

import User from '../models/user.model';
import Order, { PaymentTerms } from '../models/order.model';
import Pizza from '../models/pizza.model';

interface CreateOrderRequest {
    total: number;
    user_id: number;
    pizzas: Pizza[]; 
    establishment_id: number;
    payment_term: PaymentTerms;
};

interface UpdateOrderRequest {
    id: number;
    total?: number;
    user_id?: number;
    finished?: boolean;
    finished_at?: Date;
    establishment_id?: number;
    payment_term?: PaymentTerms;
};

class OrdersController {
    async create(req: Request, res: Response) {
        try {
            const { 
                total, 
                user_id, 
                pizzas,
                payment_term,
                establishment_id, 
            }: CreateOrderRequest = req.body;                
        
            const trx = await knex.transaction();
    
            const order = {
                total,
                user_id,
                payment_term,
                establishment_id,
            };

            const insertedOrder = await trx<Order>('orders')
                .insert(order, 'id');

            const order_id = insertedOrder[0];
            
            const ordersPizzas = pizzas
                .map(({ id: pizza_id, quantity }) => (
                    {
                        pizza_id,
                        quantity,
                        order_id,
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

    async update(req: Request, res: Response) {
        try {
            const {
                id,
                total, 
                user_id, 
                finished,
                payment_term,
                establishment_id, 
            }: UpdateOrderRequest = req.body;                
        
            const trx = await knex.transaction();
    
            const order: UpdateOrderRequest = {
                id,
                total,
                user_id,
                finished,
                payment_term,
                establishment_id,
            };

            if (finished) order.finished_at = new Date();

            await trx<Order>('orders').update(order, '*');

            await trx.commit();
    
            return res.status(200).json(order);

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async index(req: Request | any, res: Response) {
        try {
            const user = req.user as unknown as User;

            const orders: Order[] = await knex<Order>('orders as o')
                .join('users as u', 'u.id', '=', 'o.user_id')
                .join('establishments as e', 'e.id', '=', 'o.establishment_id')
                .select(
                    'o.id as id',
                    'u.first_name as first_name', 
                    'u.last_name as last_name',
                    'u.latitude as user_latitude',
                    'u.longitude as user_longitude',
                    'e.latitude as establishment_latitude',
                    'e.longitude as establishment_longitude',
                    'e.company_name as company_name',
                    'o.total as total',
                    'o.created_at as created_at'
                )
                .where('o.user_id', user.id || 0)
                .orderBy('o.id', 'desc');

            const ordersIds = orders.map((order) => order.id);

            const ordersItems = await knex('orders_pizzas as op')
                .whereIn('op.order_id', ordersIds)
                .join('pizzas as p', 'p.id', '=', 'op.pizza_id')
                .select(
                    'p.id as id',
                    'p.name as name',
                    'p.price as price',
                    'p.ingredients as ingredients',
                    'op.order_id as order_id',
                    'op.quantity as quantity',
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
                .join('establishments as e', 'e.id', '=', 'o.establishment_id')
                .select(
                    'o.id as id',
                    'o.total as total',
                    'o.created_at as created_at',
                    'o.payment_term as payment_term',
                    'u.first_name as user_first_name', 
                    'u.last_name as user_last_name',
                    'u.latitude as user_latitude',
                    'u.longitude as user_longitude',
                    'e.company_name as company_name',
                    'e.latitude as establishment_latitude',
                    'e.longitude as establishment_longitude',
                )
                .first();

            const orderItems = await knex('orders_pizzas as op')
                .where('op.order_id', id)
                .join('pizzas as p', 'p.id', '=', 'op.pizza_id')
                .select(
                    'p.id as id',
                    'p.name as name', 
                    'p.price as price',
                    'p.ingredients as ingredients',
                    'p.image as image',
                    'op.quantity as quantity',
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
