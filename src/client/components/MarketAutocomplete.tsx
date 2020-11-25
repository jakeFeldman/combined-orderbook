import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { useEffect, useState } from 'react';

import { api } from '../utils/api';

export type MarketOption = {
    label: string;
    value: string;
}

type MarketResponse = {
    [key: string]: string[];
}

type MarketAutocompleteProps = {
    onChange(event: React.ChangeEvent<{}>, option: MarketOption|null): void;
    market: string;
}

const formatMarkets = (markets: MarketResponse): MarketOption[] => {
    return Object.entries(markets).reduce((acc: MarketOption[], [key, value]) => {
        value.filter(item => item !== key).forEach((item) => {
            const option = `${key}-${item}`;
            acc.push({ label: option, value: option });
        });
        return acc;
    }, []);
};

export const DEFAULT_MARKET = 'ETH-BTC';

export const MarketAutocomplete = ({ onChange, market }: MarketAutocompleteProps) => {
    const [markets, setMarkets] = useState<MarketOption[]|null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.markets.get();
                setMarkets(formatMarkets(response.data.results));
            }
            catch (error) {
                // TODO: Log to sentry
                console.error('error', error);
            }
        })();
    }, []);

    if (!markets) return null;

    const value = markets.find(option => option.value === (market || DEFAULT_MARKET));

    return (
        <Autocomplete
            id="market-autocomplete"
            options={markets}
            getOptionLabel={(option: MarketOption) => option.label}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label="Markets" variant="outlined" margin="normal" />}
            renderOption={(option, { inputValue }) => {
                const matches = match(option.label, inputValue);
                const parts = parse(option.label, matches);
                return (
                    <div>
                        {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                            </span>
                        ))}
                    </div>
                );
            }}
            onChange={onChange}
            value={value}
        />
    );
};
