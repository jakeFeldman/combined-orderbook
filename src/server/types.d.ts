export type Order = {
    rate: string|number;
    quantity: string|number;
    total: number;
    exchanges: string[];
}

export type Orderbooks = {
    asks: Order[],
    bids: Order[],
}
