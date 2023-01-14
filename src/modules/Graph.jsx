import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
// import SpriteText from 'three-spritetext';

const colors = ["green", "#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]
let fg={};
class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: null, onNodeClick: props.onNodeClick, onLinkClick: props.onLinkClick, height:props.height };
        this.fgRef = React.createRef();
    }

    componentDidMount() {
        fg = this.fgRef.current;
        fg.d3Force('charge').strength(-1000);
    }


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

    render() {
        //let elHeight = document.getElementById('inner-row-1').clientHeight
        return (
            <div>{this.props.data && this.props.data.nodes ? this.displayGraph() : <div className="graph-label">Submit a Cypher command</div>}</div>

        );
    }
}

export default Graph;
