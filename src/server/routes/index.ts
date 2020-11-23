import * as express from 'express';
import { makeExchangeFilters } from 'src/server/utils/formatters';

import { api } from '../utils/api';

const router = express.Router();

router.get('/orderbook', async (req, res) => {
    try {
        // add filters for different markets
        const { depth, bittrex, poloniex } = makeExchangeFilters(req.query);

        const [bittrexOrderbook, poloniexOrderbook] = await Promise.all([
            api.bittrex.orderbook.get(bittrex, { depth }),
            api.poloniex.orderbook.get(poloniex, { depth }),
        ]);

        // Get orderbook from bittrex for market
        // Get orderbook from poloniex for market
        // format response to be uniform
        // calculate total liquidity
        return res.json({
            bittrex: bittrexOrderbook.data,
            poloniex: poloniexOrderbook.data
        });
    }
    catch (error) {
        console.error('error', error);
        return res.json(error);
    }
});

router.get('/currencies', async (req, res) => {
    try {
        const [bittrexCurrencies, poloniexCurrencies] = await Promise.all([
            api.bittrex.currencies.get(),
            api.poloniex.currencies.get(),
        ]);
        const bittrexSymbols: string[] = bittrexCurrencies.data.map((currency: BittrexCurrency) => currency.symbol);
        const poloniexSymbols = Object.keys(poloniexCurrencies.data);
        // Only return non-unique currencies, ie. only return currencies that exist on each exchange
        const hashMap: { [key:string]: number } = {};
        const currencies = [...bittrexSymbols, ...poloniexSymbols].reduce((acc: string[], symbol: string) => {
            if (hashMap[symbol]) {
                acc.push(symbol);
                hashMap[symbol]++;
            }
            else {
                hashMap[symbol] = 1;
            }
            return acc;
        }, []);

        res.json({
            currencies,
            total: currencies.length,
        });
    }
    catch (error) {
        console.error('error', error);
        return res.json(error);
    }
});

export { router };

type BittrexCurrency = {
    symbol: string;
    name: string;
    coinType: string;
    status: string;
    minConfirmations: number;
    notice: string;
    txFee: string;
    logoUrl: string;
    prohibitedIn: string[];
    baseAddress: string;
    associatedTermsOfService: string[];
}
