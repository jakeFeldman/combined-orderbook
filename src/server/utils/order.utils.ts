type BittrexAskBid = {
    quantity: string;
    rate: string;
};

type BittrexResponse = {
    ask: BittrexAskBid[];
    bid: BittrexAskBid[];
}

type PoloniexAskBid = [string, number];

type PoloniexResponse = {
    asks: PoloniexAskBid[];
    bids: PoloniexAskBid[];
    isFrozen: string;
    seq: number;
}

export type Order = {
    rate: string|number;
    quantity: string|number;
    total: number;
    exchanges: string[];
}

export const makeOrder = ({ quantity, rate, exchange }: {
    quantity: string|number;
    rate: string;
    exchange: string|string[];
}): Order => ({
    quantity,
    rate,
    total: parseFloat((Number(quantity) * Number(rate)).toFixed(4)),
    exchanges: Array.isArray(exchange) ? exchange : [exchange],
});

/**
 *
 * @param {BittrexResponse}
 */
export const makeBittrexOrders = (response: BittrexResponse) => ({
    bids: response.bid.map(({ rate, quantity }) => makeOrder({
        rate,
        quantity,
        exchange: 'bittrex'
    })),
    asks: response.ask.map(({ rate, quantity }) => makeOrder({
        rate,
        quantity,
        exchange: 'bittrex'
    })),
});

/**
 *
 * @param {PoloniexAskBid}
 */
export const makePoloniexOrders = (response: PoloniexResponse) => ({
    bids: response.bids.map(([rate, quantity]) => makeOrder({
        rate,
        quantity,
        exchange: 'poloniex',
    })),
    asks: response.asks.map(([rate, quantity]) => makeOrder({
        rate,
        quantity,
        exchange: 'poloniex',
    })),
});
