import React from 'react';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import IconButton from '@mui/material/IconButton';
import GridViewIcon from '@mui/icons-material/GridView';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

      /**
   * Main constructur handling state for this component
   * @param {*} propertiers passed into the component
   */
  constructor(props) {
        super(props);
        this.state = { dagDirection : props.dagDirection }
    }

    getDagSelector = () => {
        if (this.props.graphType === "DAG") {
            return (
            <Select
                onChange={this.props.setDagDirection}
                displayEmpty
                value={this.props.dagDirection}
                inputProps={{ 'aria-label': 'Without label' }}>
            
            <MenuItem value={"td"}>td</MenuItem>
            <MenuItem value={"bu"}>bu</MenuItem>
            <MenuItem value={"lr"}>lr</MenuItem>
            <MenuItem value={"rl"}>rl</MenuItem>
            <MenuItem value={"radialout"}>ro</MenuItem>
            <MenuItem value={"radialin"}>ri</MenuItem>
            <MenuItem value={null}>0</MenuItem>
            </Select>
            );
        } else {
            return "";
        } 
    }

    render() {
        return (
            <>
            <div><IconButton title="Display as Text" onClick={() => this.props.displayGraphType("TEXT")}><TitleRoundedIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display in Grid View" onClick={() => this.props.displayGraphType("GRID")}><GridViewIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display in GraphView" onClick={() => this.props.displayGraphType("GRAPH")}><ScatterPlotIcon fontSize="large" /></IconButton></div>
            <div><IconButton title="Display DAG" onClick={() => this.props.displayGraphType("DAG")}><AccountTreeIcon fontSize="large" /></IconButton></div>
            <div className="dag-selector">{this.getDagSelector()}</div>
            </>
        );
    }
}

export default IconPanel;