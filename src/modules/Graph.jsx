import React from 'react';
import { ForceGraph3D } from 'react-force-graph';

/**
 * List of colors for the nodes on the graph
 */
const colors = ["green", "#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]

/**
 * Force Graph component for rendering
 */
let fg={};

/****************************************************************************
 * <b>Title</b>: Graph.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Utilizes the React Force Graph compnent to build and 
 * display the graph nodes and relationships.  Utilizing the 3D view for this component
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class Graph extends React.Component {

    /**
     * Initiualizes the graph with the graph data and callbacks
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { data: null, onNodeClick: props.onNodeClick, onLinkClick: props.onLinkClick};
        this.fgRef = React.createRef();
    }

    /**
     * Modifies the node charge strength to provide better spacing between the nodes
     */
    componentDidMount() {
        fg = this.fgRef.current;
        fg.d3Force('charge').strength(-1000);
    }

    /**
     * Confiures and builds the graph component
     * @returns Force Graph component with all properties assigned
     */
    displayGraph() {
        return (
            <>
                <ForceGraph3D
                    ref={this.fgRef}
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={document.getElementById("graph-wrapper").clientHeight}
                    showNavInfo={true}
                    nodeRelSize={6}
                    autoPauseRedraw={false}
                    nodeResolution={64}
                    nodeVal={(node) => {
                        if (! node.properties.phase) return 1;
                        else return 5;
                    }}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                        node.fz = node.z;
                    }}
                    nodeLabel={(node) => {
                        return node.properties.serviceName;
                    }}
                    graphData={this.props.data}
                    onNodeClick={this.state.onNodeClick}
                    onLinkClick={this.state.onLinkClick}
                    nodeColor={(node) => {
                        let phase = node.properties.phase;
                        if (phase >= 0 && phase < colors.length) return colors[phase];
                        return colors[0];
                    }}
                    linkColor={() => 'rgba(255,0,0,0.5)'}
                    linkWidth={2}
                    linkLabel={"type"}
                    linkDirectionalArrowLength={3}
                    linkDirectionalArrowColor={() => '#ff0000'}
                    linkOpacity={.75}
                />
            </>
        )
    }

    /**
     * Renders the graph component or a message depending on if data exists or not
     * @returns Component
     */
    render() {
        return (
            <div>{this.props.data && this.props.data.nodes ? this.displayGraph() : <div className="graph-label">Submit a Cypher command</div>}</div>

        );
    }
}

export default Graph;
