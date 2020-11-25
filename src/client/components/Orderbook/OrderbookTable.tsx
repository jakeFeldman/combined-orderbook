import MuiPaper from '@material-ui/core/Paper';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import React from 'react';

export const OrderbookTable = ({ data }: {
    data: Array<{
        quantity: number|string;
        rate: number|string;
        total: number;
        exchanges: string[];
    }>,
}): JSX.Element => {
    return (
        <MuiTableContainer component={MuiPaper}>
            <MuiTable className="" size="small">
                <MuiTableHead>
                    <MuiTableRow>
                        <MuiTableCell align="left">Size</MuiTableCell>
                        <MuiTableCell align="left">Price</MuiTableCell>
                        <MuiTableCell align="left">Total</MuiTableCell>
                        <MuiTableCell align="left">Exchange</MuiTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {data.map((row: any) => (
                        <MuiTableRow key={row.rate}>
                            <MuiTableCell align="left">{row.quantity}</MuiTableCell>
                            <MuiTableCell align="left">{row.rate}</MuiTableCell>
                            <MuiTableCell align="left">{row.total}</MuiTableCell>
                            <MuiTableCell align="left">{row.exchanges}</MuiTableCell>
                        </MuiTableRow>
                    ))}
                </MuiTableBody>
            </MuiTable>
        </MuiTableContainer>
    );
};
