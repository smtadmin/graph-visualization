import React  from 'react';
import { ForceGraph3D } from 'react-force-graph';
// import SpriteText from 'three-spritetext';

const colors = ["#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"]
class Graph extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {data: null, onNodeClick: args[0].onNodeClick, onLinkClick: args[0].onLinkClick};
    }

    displayGraph() {
        return (
            <>
                <ForceGraph3D 
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={500}
                    showNavInfo={true} 
                    nodeRelSize={6} 
                    nodeVal={1}
                    nodeLabel={(node) => {
                        return node.properties.serviceName;
                    }}
                    graphData={this.props.data}
                    onNodeClick={this.state.onNodeClick}
                    onLinkClick={this.state.onLinkClick}
                    nodeColor={(node) => {
                        let phase = node.properties.phase;
                        if (phase >= 0 && phase < colors.length) return colors[phase-1];
                        return colors[0];
                    }}
                    linkColor={() => 'rgba(255,0,0,0.5)'}
                    linkWidth={2}
                    linkLabel={"type"}
                    linkDirectionalArrowLength={3}
                    linkDirectionalArrowColor={() => 'rgba(255,255,255,0.2)'}
                    linkOpacity={.75}
                />
            </>
        )
    }

    render() {
      return (
        <div >{this.props.data && this.props.data.nodes ? this.displayGraph() : <em>Submit a Cypher command</em>}</div>
        
      );
    }
}

export default Graph;
