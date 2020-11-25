import { Request } from 'express';
import { ServerError } from 'src/server/utils/errors';
import { makeOrder, Order } from 'src/server/utils/order.utils';

const orderbookDepth = (depth: string) => {
    const DEFAULT_DEPTH = '25';
    if (!depth || typeof depth !== 'string') return DEFAULT_DEPTH;
    /**
     * Allowed depth per bittrex API [1, 25, 500] and max depth of 100 per poloniex API
     * resulting in an allowed depth of 1 or 25
     * @see https://bittrex.github.io/api/v3
     * @see https://docs.poloniex.com/#returnorderbook
     */
    const allowedDepths = ['1', '25'];
    return (allowedDepths.includes(depth)) ? depth : DEFAULT_DEPTH;
};

/**
 * Format Bittrex market based on client search. To maintain consistency this formatter is in place even though its a noop
 * @see https://bittrex.github.io/api/v3
 */
const formatBittrexMarket = (market: string) => market;

/**
 * Format Poloniex market based on client search
 * Note: poloniex stores their currency pairs opposite of bittex
 * @see https://docs.poloniex.com/#returnorderbook
 */
const formatPoloniexMarket = (market: string) => market.split('-').reverse().join('_');

export const makeExchangeParams = (query: Request['query']) => {
    const { market, depth } = query;
    if (!market) {
        throw new ServerError('market param is required', 400);
    }
    return {
        depth: orderbookDepth(depth as string),
        bittrex: formatBittrexMarket(market as string),
        poloniex: formatPoloniexMarket(market as string),
    };
};

export const mergeBooks = (bittrex: any, poloniex: any, type: string) => {
    // Using a defined depth bid and ask will always be the same length
    return bittrex.reduce((acc: Order[], current: Order, idx: number) => {
        const bittrexOrder = current;
        const poloniexOrder = poloniex[idx];
        const addBittrex = type === 'bid'
            ? bittrexOrder.rate < poloniexOrder.rate
            : bittrexOrder.rate > poloniexOrder.rate;

        if (addBittrex) {
            acc.push(bittrexOrder);
        }
        else if (bittrexOrder.rate === poloniexOrder.rate) {
            // makeOrder()
        }
        else {
            acc.push(poloniexOrder);
        }
        return acc;
    }, []);
};

export const combinedOrderbook = (books: any) => {
    const { bittrex, poloniex } = books;
    const asks = mergeBooks(bittrex.asks, poloniex.asks, 'ask');
    const bids = mergeBooks(bittrex.bids, poloniex.bids, 'bid');
    return {
        asks,
        bids,
    };
};
