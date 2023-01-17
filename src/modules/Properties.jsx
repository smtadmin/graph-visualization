import React  from 'react';
import parse from "html-react-parser";

/****************************************************************************
 * <b>Title</b>: Properties.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Properties panel that displays the meta data for the node 
 * or link when clicked on the graph
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class Properties extends React.Component {

    /**
     * Controller function that calls the node or link method to generate the panel data
     * @returns Panel with the appropriate meta data or message
     */
    displayElement = () => {
        if (this.props.nodeData) return this.displayNode(this.props.nodeData);
        if (this.props.linkData) return this.displayLink(this.props.linkData);
        else return "<div className='info-panel'>Click on a Node or link to display it's properties</div>"
    }

    /**
     * Formats the row data on the penel for a line of text in both the links 
     * and nodes.  Ensures conformity of display for all metadata
     * @param {*} keyLabel heading for the metadata element
     * @param {*} value Value of the key data to be displayed
     * @returns Formatted row of data
     */
    displayRow = (key, value) => {
        let ele = "<div><span className='property-key'>" + key + ": </span>";
        ele += "<span className='property-value'>" + value + "</span></div>";
        return ele;
    }

    /**
     * Displays all of the metadata for the node element
     * @param {*} nodeData Data asscoiated tot he node
     * @returns Row formatted data for each metadata item
     */
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

    /**
     * Displays all of the metadata for the link element
     * @param {*} linkData Data asscoiated to the link
     * @returns Row formatted data for each metadata item
     */
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

    /**
     * On a link or node click, renders the appropriate metadata for each item
     * @returns Rendered panel of data
     */
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