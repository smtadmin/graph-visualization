import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class GridDisplay extends React.Component {

    /**
     * Main constructur handling state for this component
     * @param {*} propertiers passed into the component
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service ID</TableCell>
                            <TableCell>Service Name</TableCell>
                            <TableCell align="center">Phase</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            <TableCell align="center">SLA</TableCell>
                            <TableCell align="center">Performance</TableCell>
                            <TableCell align="center">Eco</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.data.nodes.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.properties.serviceId}</TableCell>
                            <TableCell align="left">{row.properties.serviceName}</TableCell>
                            <TableCell align="center">{row.properties.phase}</TableCell>
                            <TableCell align="center">{row.properties.userWeight}</TableCell>
                            <TableCell align="center">{row.properties.costWeight}</TableCell>
                            <TableCell align="center">{row.properties.slaWeight}</TableCell>
                            <TableCell align="center">{row.properties.performanceWeight}</TableCell>
                            <TableCell align="center">{row.properties.ecoWeight}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer >
        );
    }
}

export default GridDisplay;