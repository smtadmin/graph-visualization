import React  from 'react';
import { ForceGraph2D } from 'react-force-graph';
import SpriteText from 'three-spritetext';

class Graph extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {data: null, onNodeClick: args[0].onNodeClick, onLinkClick: args[0].onLinkClick};
    }

    displayGraph() {
        return (
            <div>
                <ForceGraph2D 
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={500}
                    showNavInfo={false} 
                    nodeRelSize={10} 
                    nodeLabel={"identifier"}
                    graphData={this.props.data}
                    linkLabel={"identifier"}
                    onNodeClick={this.state.onNodeClick}
                    onLinkClick={this.state.onLinkClick}
                    nodeAutoColorBy="group"
                    nodeThreeObjectExtend={true}
                    nodeThreeObject={(node) => {
                        const sprite = new SpriteText(node.id);
                        sprite.color = node.color;
                        sprite.textHeight = 8;
                        return sprite;
                    }}
                    linkDirectionalParticleColor={"red"}
                    linkDirectionalParticles={5}
                    linkDirectionalParticleWidth={3}
                    linkDirectionalArrowLength={5}
                    linkColor={"red"}
                    linkWidth={1}
                />
            </div>
        )
    }

    render() {
      return (
        <div>{this.props.data ? this.displayGraph() : <em>Submmit a Cypher command</em>}</div>
        
      );
    }
}

export default Graph;
