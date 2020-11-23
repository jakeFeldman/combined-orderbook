import { Request } from 'express';

import { ServerError } from './errors';

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
 * Format Bittrex market based on client search
 * @see https://bittrex.github.io/api/v3
 */
const formatBittrexMarket = (market: string) => {
    return market;
};

/**
 * Format Poloniex market based on client search
 * @see https://docs.poloniex.com/#returnorderbook
 */
const formatPoloniexMarket = (market: string) => {
    return market.split('-').join('_');
};

export const makeExchangeFilters = (query: Request['query']) => {
    const { market, depth } = query;
    if (!market) {
        throw new ServerError('Market is required', 400);
    }
    return {
        depth: orderbookDepth(depth as string),
        bittrex: formatBittrexMarket(market as string),
        poloniex: formatPoloniexMarket(market as string),
    };
};
