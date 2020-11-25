import axios from 'axios';
import { GenericObject } from 'src/shared/types';

export const api = {
    markets: {
        get: (params: GenericObject = {}) => axios({
            url: '/api/markets',
            method: 'get',
            params
        })
    },
    orderbook: {
        get: (params: GenericObject = {}) => axios({
            url: '/api/orderbook',
            method: 'get',
            params,
        })
    }
};
