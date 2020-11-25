import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';

import { useInterval } from '../../hooks/useInterval';
import { api } from '../../utils/api';
import { DEFAULT_MARKET, MarketAutocomplete, MarketOption } from '../MarketAutocomplete';
import { OrderbookTable } from './OrderbookTable';

export const Orderbook = (): JSX.Element|null => {
    const [market, setMarket] = useState<string>(DEFAULT_MARKET);
    const [orderbook, setOrderbook] = useState<any|null>(null);
    const handleChange = (e: React.ChangeEvent<{}>, option: MarketOption | null) => {
        if (option?.value) {
            setMarket(option.value);
        }
    };

    const fetcher = useCallback(async () => {
        try {
            const response = await api.orderbook.get({ market });
            setOrderbook(response.data);
        }
        catch (error) {
            // TODO: Add sentry logging
            console.error('error', error);
        }
    }, [market]);

    useInterval(fetcher, 1500);

    if (!orderbook) return null;

    const { asks, bids } = orderbook;

    return (
        <div>
            <MarketAutocomplete market={market} onChange={handleChange} />
            <Grid container justify="space-between">
                <Grid item xs={12} sm={12} md={6}>
                    <h1>Bids</h1>
                    <OrderbookTable data={bids} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <h1>Asks</h1>
                    <OrderbookTable data={asks} />
                </Grid>
            </Grid>
        </div>
    );
};
