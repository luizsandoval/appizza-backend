import Pizza from './pizza.model';

export default interface Order {
    id: number;
    user_id: number;
    total: number;
    pizza: Pizza[];
    created_at: Date;
};
