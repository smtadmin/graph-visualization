import React, {  } from 'react';
import { ForceGraph2D } from 'react-force-graph';
const colors = ["#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]

class DagGraph extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = { data: null, onNodeClick: args[0].onNodeClick, onLinkClick: args[0].onLinkClick };
        this.fgRef = React.createRef();
    }

    ForceTree() {
        return (
            <>
                <ForceGraph2D
                    ref={this.fgRef}
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={500}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                    }}
                    nodeVal={(node) => {
                        if (! node.properties.phase) return 1;
                        else return 5;
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
                    dagMode={'td'}
                    dagLevelDistance={50}
                    linkDirectionalParticles={2}
                    linkDirectionalParticleWidth={2}
                    d3VelocityDecay={0.3}
                />
            </>
        )
    }

    render() {
        return (
            <div>{this.props.data && this.props.data.nodes ? this.ForceTree() : <em>Submit a Cypher command</em>}</div>

        );
    }
}

export default DagGraph;
