import React from 'react';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import IconButton from '@mui/material/IconButton';
import GridViewIcon from '@mui/icons-material/GridView';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

/****************************************************************************
 * <b>Title</b>: BrowserLayout.jsx.java
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Main display/controller for the APM graph display
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/

class IconPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        

        return (
            <>
            <div><IconButton title="Display as Text" onClick={() => this.props.displayGraphType("TEXT")}><TitleRoundedIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display in Grid View" onClick={() => this.props.displayGraphType("GRID")}><GridViewIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display in GraphView" onClick={() => this.props.displayGraphType("GRAPH")}><ScatterPlotIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display DAG" onClick={() => this.props.displayGraphType("DAG")}><AccountTreeIcon fontSize="large" /></IconButton></div>
            </>
        );
    }

}

export default IconPanel;