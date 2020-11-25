import MuiAppBar from '@material-ui/core/AppBar';
import React from 'react';

import { Orderbook } from './components/Orderbook/Orderbook';

export const App = (): JSX.Element => {
    return (
        <div>
            <MuiAppBar position="static" />
            <Orderbook />
        </div>
    );
};
