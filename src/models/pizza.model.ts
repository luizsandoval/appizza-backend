export default interface Pizza {
    id?: number;
    createdAt?: Date;
    active?: boolean;
    description?: string;
    name: string;
    ingredients: string;
    establishment_id: string;
    image: string;
    price: number;
    quantity: number;
};
