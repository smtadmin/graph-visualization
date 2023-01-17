import React from "react";

/****************************************************************************
 * <b>Title</b>: TextDisplay.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Displays the raw json from the cypher command being executed
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class TextDisplay extends React.Component {

    /**
     * Uses JSON.stringify and <pre> to render the json in a readable way
     * @returns Json data from the request
     */
    render() {
        return (
            <div className="pretty-json" style={{height: this.props.height, maxHeight: this.props.height}}>
                <pre>{ JSON.stringify(this.props.data, null, 2) }</pre>
            </div>
        );
    }
}

export default TextDisplay;