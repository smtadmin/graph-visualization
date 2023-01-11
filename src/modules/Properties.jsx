import React  from 'react';
import parse from "html-react-parser";

class Properties extends React.Component {

    displayElement = () => {
        if (this.props.nodeData) return this.displayNode(this.props.nodeData);
        if (this.props.linkData) return this.displayLink(this.props.linkData);
        else return "<div className='info-panel'>Put something here</div>"
    }


    displayNode = (nodeData) => {
        let ele = "<div className='info-panel'><h4>Node Attributes</h4>";
        ele += "<div>ID: " + nodeData.id + "</div>";
        ele += "<div>Color: " + nodeData.color + "</div>";
        ele += "<div>Group: " + nodeData.group + "</div>";
        ele += "<div>Index: " + nodeData.index + "</div></div>";

        return ele;
    }

    displayLink = (linkData) => {
        let ele = "<div className='info-panel'><h4>Link Attributes</h4>";
        ele += "<div>Relationship Value:" + linkData.value + "</div>";
        ele += "<div>Relationship Index:" + linkData.index + "</div>";
        ele+= "<hr/>";
        ele += "<div>Source ID:" + linkData.source.id + "</div>";
        ele += "<div>Source Color:" + linkData.source.color + "</div>";
        ele += "<div>Source Group:" + linkData.source.group + "</div>";
        ele+= "<hr/>";
        ele += "<div>Target ID:" + linkData.target.id + "</div>";
        ele += "<div>Target Color:" + linkData.target.color + "</div>";
        ele += "<div>Target Group:" + linkData.target.group + "</div></div>";       
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