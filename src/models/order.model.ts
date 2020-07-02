export default interface Order {
    id: number;
    user_id: number;
    total: number;
    address: string;
    pizza_ids: number[];
    created_at: Date;
}
