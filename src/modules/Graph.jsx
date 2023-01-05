import React  from 'react';
import axios from 'axios';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
var ctr = 0;

class Graph extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {data: null, onNodeClick: args[0].onNodeClick, onLinkClick: args[0].onLinkClick};

        console.log(this.state);
        console.log(args);
    }
   
    componentDidMount() {
        if (!this.state.data && ctr++ < 1) {
            this.getData()
                .then(data => this.setState({data}))
                .catch(err => { console.log(err)});
        }
    }

    async getData() {
        console.log("Getting");
        const res = await axios.get('./miserables.json')
        return res.data;
    }


    displayGraph() {
        console.log("Width: " + document.getElementById("graph-wrapper").clientWidth);
        return (
            <div>
                <ForceGraph3D 
                    width={document.getElementById("graph-wrapper").clientWidth}
                    height={500}
                    showNavInfo={false} 
                    nodeRelSize={10} 
                    nodeLabel={"id"}
                    graphData={this.state.data}
                    linkLabel={"id"}
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
                    linkWidth={(link) => {
                        return (link.source.group === 8) ? 10 : 1;
                    }}
                />
            </div>
        )
    }

    render() {
      return (
        <div>{this.state.data ? this.displayGraph() : <em>Loading ...</em>}</div>
        
      );
    }
}

export default Graph;