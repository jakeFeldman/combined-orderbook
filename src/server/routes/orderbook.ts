import * as express from 'express';
import { api } from 'src/server/utils/api';
import { makeBittrexOrders, makePoloniexOrders } from 'src/server/utils/order.utils';
import { combinedOrderbook, makeExchangeParams } from 'src/server/utils/orderbook.utils';

const orderbook = express.Router();

/**
 * GET /api/orderbook returns the combined orderbooks from bittrex and poloniex
 */
orderbook.get('/', async (req, res) => {
    try {
        const { depth, bittrex, poloniex } = makeExchangeParams(req.query);
        const [bittrexOrderbook, poloniexOrderbook] = await Promise.all([
            api.bittrex.orderbook.get(bittrex, { depth }),
            api.poloniex.orderbook.get(poloniex, { depth }),
        ]);
        return res.json(combinedOrderbook({
            bittrex: makeBittrexOrders(bittrexOrderbook.data),
            poloniex: makePoloniexOrders(poloniexOrderbook.data),
        }));
    }
    catch (error) {
        console.error('error', error);
        return res.json(error);
    }
});

export { orderbook };
