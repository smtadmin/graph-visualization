import React, {  } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const colors = ["green", "#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]
let fg={};
class DagGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: null, onNodeClick: props.onNodeClick, onLinkClick: props.onLinkClick, dagDirection: props.dagDirection};
        this.fgRef = React.createRef();
    }

    componentDidMount() {
        fg = this.fgRef.current;
        fg.d3Force('charge').strength(-1000);
    }

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

    render() {
        return (
            <div>{this.props.data && this.props.data.nodes ? this.ForceTree() : <em>Submit a Cypher command</em>}</div>

        );
    }
}

export default DagGraph;
