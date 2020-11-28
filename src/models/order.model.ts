import Pizza from './pizza.model';

type PaymentTerms = 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito';

export default interface Order {
    id: number;
    total: number;
    pizzas: Pizza[];
    user_id: number;
    created_at: Date;
    establishment_id: number;
    payment_term: PaymentTerms;
};
