import React  from 'react';
import parse from "html-react-parser";

class Properties extends React.Component {

    displayElement = () => {
        if (this.props.nodeData) return this.displayNode(this.props.nodeData);
        if (this.props.linkData) return this.displayLink(this.props.linkData);
        else return "<div className='info-panel'>Click on a Node or link to display it's properties</div>"
    }

    displayRow = (key, value) => {
        let ele = "<div><span className='property-key'>" + key + ": </span>";
        ele += "<span className='property-value'>" + value + "</span></div>";
        return ele;
    }


    displayNode = (nodeData) => {
        let ele = "<div className='info-panel'><h4>Node Attributes</h4>";
        ele += this.displayRow("ID", nodeData.id);
        ele += this.displayRow("Index", nodeData.index);
        
        for(const key in nodeData.properties) {
            ele += this.displayRow(key, nodeData.properties[key]);
        }
        ele += "</div>";
        return ele;
    }

    displayLink = (linkData) => {
        let ele = "<div className='info-panel'><h4>Link Attributes</h4>";
        ele += this.displayRow("Relationship Index", linkData.index);
        ele += this.displayRow("Relationship Type", linkData.type);

        for(const key in linkData.properties) {
            ele += this.displayRow(key, linkData.properties[key]);
        }
        
        ele+= "<hr/>";
        ele += this.displayRow("Source ID", linkData.source.id);
        ele += this.displayRow("Source Service Name", linkData.source.serviceName);
        ele+= "<hr/>";
        ele += this.displayRow("Target ID", linkData.target.id);
        ele += this.displayRow("Target Service Name", linkData.target.serviceName);

        return ele;
    }

    render() {
        return (
            <>
                <h3>Properties</h3>
                <div>
                    {parse(this.displayElement())}
                </div>
            </>
        )
    }
}

export default Properties;