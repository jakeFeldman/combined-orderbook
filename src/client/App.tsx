import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import React from 'react';

import { Orderbook } from './components/Orderbook/Orderbook';

export const App = (): JSX.Element => {
    return (
        <div>
            <MuiAppBar position="static">
                <MuiToolbar variant="dense">
                    <h3>Bittrex | Poloniex Orderbook</h3>
                </MuiToolbar>
            </MuiAppBar>
            <Orderbook />
        </div>
    );
};
