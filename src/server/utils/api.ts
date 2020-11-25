import axios from 'axios';
import { GenericObject } from 'src/shared/types';

export const endpoints = {
    bittrex: 'https://api.bittrex.com/v3',
    poloniex: 'https://poloniex.com/public',
};

export const api = {
    bittrex: {
        markets: {
            get: (params: GenericObject = {}) => axios({
                method: 'get',
                url: `${endpoints.bittrex}/markets/`,
                params,
            })
        },
        orderbook: {
            get: (market: string, params: GenericObject = {}) => axios({
                method: 'get',
                url: `${endpoints.bittrex}/markets/${market}/orderbook/`,
                params,
            })
        },
    },
    poloniex: {
        markets: {
            get: (params: GenericObject = {}) => axios({
                method: 'get',
                url: `${endpoints.poloniex}`,
                params: {
                    // Use returnTicker as a workaround to get list of all currency pairs (markets)
                    command: 'returnTicker',
                    ...params
                }
            })
        },
        orderbook: {
            get: (market: string, params: GenericObject = {}) => axios({
                method: 'get',
                url: `${endpoints.poloniex}`,
                params: {
                    command: 'returnOrderBook',
                    currencyPair: market,
                    ...params
                }
            })
        },
    },
};
