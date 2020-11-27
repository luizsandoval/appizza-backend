export default interface Pizza {
    id?: number;
    createdAt?: Date;
    active?: boolean;
    description?: string;
    name: string;
    ingredients: string;
    establishment_id: string;
    price: number;
    image: string;
}
