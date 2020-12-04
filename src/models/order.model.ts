import Pizza from './pizza.model';

export type PaymentTerms = 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito';

export default interface Order {
    id: number;
    total: number;
    pizzas: Pizza[];
    user_id: number;
    created_at: Date;
    finished_at?: Date;
    finished?: boolean;
    establishment_id: number;
    payment_term: PaymentTerms;
};
