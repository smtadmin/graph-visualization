import React, {  } from 'react';
import { ForceGraph2D } from 'react-force-graph';

/**
 * List of colors for the nodes on the graph
 */
const colors = ["green", "#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]

/**
 * Force Graph component for rendering
 */
let fg={};

/****************************************************************************
 * <b>Title</b>: DagGraph.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Utilizes the React Force Graph compnent to build and 
 * display the graph nodes and relationships as a DAG.  Utilizing the 2D view for 
 * this component
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class DagGraph extends React.Component {

    /**
     * Initiualizes the graph with the graph data and callbacks
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { data: null, onNodeClick: props.onNodeClick, onLinkClick: props.onLinkClick, dagDirection: props.dagDirection};
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
     * @returns Force Tree component with all properties assigned
     */
    ForceTree() {

        return (
            <>
                <ForceGraph2D
                    ref={this.fgRef}
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={document.getElementById("graph-wrapper").clientHeight}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                    }}
                    nodeVal={(node) => {
                        if (! node.properties.phase) return 1;
                        else return 4;
                    }}
                    nodeLabel={(node) => {
                        return node.properties.serviceName;
                    }}
                    autoPauseRedraw={false}
                    showNavInfo={true}
                    nodeRelSize={6}
                    graphData={this.props.data}
                    onNodeClick={this.state.onNodeClick}
                    onLinkClick={this.state.onLinkClick}
                    nodeColor={(node) => {
                        let phase = node.properties.phase;
                        if (phase >= 0 && phase < colors.length) return colors[phase];
                        return colors[0];
                    }}
                    backgroundLabel={null}
                    backgroundColor={'rgba(0,0,0)'}
                    linkColor={() => 'rgba(255,0,0,0.5)'}
                    linkWidth={2}
                    linkDirectionalArrowLength={5}
                    dagMode={this.props.dagDirection}
                    dagLevelDistance={100}
                    linkDirectionalParticles={2}
                    linkDirectionalParticleWidth={2}
                    d3VelocityDecay={0.3}
                />
            </>
        )
    }

    /**
     * Renders the dag graph component or a message depending on if data exists or not
     * @returns Component
     */
    render() {
        return (
            <div>{this.props.data && this.props.data.nodes ? this.ForceTree() : <em>Submit a Cypher command</em>}</div>

        );
    }
}

export default DagGraph;
