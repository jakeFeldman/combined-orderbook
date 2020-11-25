import express, { Request, Response } from 'express';
import { api } from 'src/server/utils/api';
import { GenericObject } from 'src/shared/types';

const markets = express.Router();

/**
 * GET /api/markets returns the markets available on each exchange that overlap
 */
markets.get('/', async (req: Request, res: Response) => {
    try {
        const [bittrexMarketResponse, poloniexmarketResponse] = await Promise.all([
            api.bittrex.markets.get(),
            api.poloniex.markets.get(),
        ]);

        const bittrexMarkets: string[] = bittrexMarketResponse.data.map((market: any) => market.symbol);
        const bittrexMarketPairs = bittrexMarkets.map((market: string) => market.split('-'));

        const poloniexMarkets = Object.keys(poloniexmarketResponse.data);
        const poloniexMarketPairs = poloniexMarkets.map((market: string) => market.split('_'));

        const bittrexMarketsMap = bittrexMarketPairs.reduce((acc: GenericObject, [left, right]: string[]) => {
            acc[left] ? acc[left].push(right) : (acc[left] = [right]);
            return acc;
        }, {});

        // Note: Poloniex stores their currencyPairs opposite of bittrex
        const poloniexMarketsMap = poloniexMarketPairs.reduce((acc: GenericObject, [left, right]: string[]) => {
            acc[right] ? acc[right].push(left) : (acc[right] = [left]);
            return acc;
        }, {});

        // Only return non-unique markets, i.e. return market pairs that exist on each exchange
        const results = Object.keys(bittrexMarketsMap).reduce((marketsAcc: GenericObject, key: string) => {
            const poloniex = poloniexMarketsMap[key];
            const bittrex = bittrexMarketsMap[key];
            // market exists in both exchanges
            if (poloniex) {
                const map = [...bittrex, ...poloniex].reduce((acc: GenericObject, symbol) => {
                    acc[symbol] = acc[symbol] + 1 || 1;
                    return acc;
                }, {});
                marketsAcc[key] = Object.keys(map).filter((k: string) => map[k] > 1);
            }
            return marketsAcc;
        }, {});

        res.json({ results });
    }
    catch (error) {
        console.error('error', error);
        return res.json(error);
    }
});

export { markets };
