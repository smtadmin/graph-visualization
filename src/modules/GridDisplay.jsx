import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

/****************************************************************************
 * <b>Title</b>: GridDisplay.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Data grid to display the graph data in a grid
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class GridDisplay extends React.Component {

    /**
     * Builds the field information for each column in the grid
     * @returns Column definition for the grid
     */
    getColumns = () => {
        return [
            { field: 'id', headerName: 'ServiceID', width:400, flex: 3 },
            { field: 'properties.serviceName', headerName: 'Service Name', flex: 3,
                valueGetter: (params) => `${params.row.properties.serviceName ? params.row.properties.serviceName : "Starting Node"}`
            },
            { field: 'properties.phase', headerName: 'Phase', align: 'center', flex:1, headerAlign: 'center',
               valueGetter: (params) => `${params.row.properties.phase ? params.row.properties.phase : 0}`
            },
            { field: 'properties.userWeight', headerName: 'User Weight', align: 'center', flex : 1, headerAlign: 'center',
               valueGetter: (params) => `${params.row.properties.userWeight ? params.row.properties.userWeight : ""}`
            },
            { field: 'properties.costWeight', headerName: 'Cost Weight', align: 'center', flex : 1, headerAlign: 'center',
               valueGetter: (params) => `${params.row.properties.costWeight ? params.row.properties.costWeight : ""}`
            },
            { field: 'properties.slaWeight', headerName: 'SLA Weight', align: 'center', flex : 1, headerAlign: 'center',
               valueGetter: (params) => `${params.row.properties.slaWeight ? params.row.properties.slaWeight : ""}`
            },
            { field: 'properties.performanceWeight', headerName: 'Performance Weight', align: 'center', flex : 1, headerAlign: 'center', minWidth : 175,
               valueGetter: (params) => `${params.row.properties.performanceWeight ? params.row.properties.performanceWeight : ""}`
            },
            { field: 'properties.ecoWeight', headerName: 'Eco Weight', align: 'center', flex : 1, headerAlign: 'center',
               valueGetter: (params) => `${params.row.properties.ecoWeight ? params.row.properties.ecoWeight : ""}`
            }
        ];
    }

    /**
     * Renders the grid utilizing the data that's passed in and the column 
     * definition defined in the getCOlumns method
     * @returns Material UI data grid
     */
    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={this.props.data.nodes}
                    columns={this.getColumns()}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        );
    }
}

export default GridDisplay;