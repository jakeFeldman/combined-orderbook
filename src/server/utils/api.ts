import axios from 'axios';

type Params = {
    [key:string]: any;
}

export const endpoints = {
    /**
     * Orderbook Example:
     * https://api.bittrex.com/v3/markets/ETH-BTC/orderbook
     */
    bittrex: 'https://api.bittrex.com/v3',
    /**
     * Orderbook Example:
     * https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=100
     */
    poloniex: 'https://poloniex.com/public',
};

export const api = {
    bittrex: {
        orderbook: {
            get: (market: string, params: Params = {}) => axios({
                method: 'get',
                url: `${endpoints.bittrex}/markets/${market}/orderbook/`,
                params,
            })
        },
        currencies: {
            get: (params: Params = {}) => axios({
                method: 'get',
                url: `${endpoints.bittrex}/currencies/`,
                params,
            })
        },
    },
    poloniex: {
        orderbook: {
            get: (market: string, params: Params = {}) => axios({
                method: 'get',
                url: `${endpoints.poloniex}`,
                params: {
                    command: 'returnOrderBook',
                    currencyPair: market,
                    ...params
                }
            })
        },
        currencies: {
            get: (params: Params = {}) => axios({
                method: 'get',
                url: `${endpoints.poloniex}`,
                params: {
                    command: 'returnCurrencies',
                    ...params
                }
            })
        },
    },
};
