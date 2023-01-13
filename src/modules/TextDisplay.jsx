import React from "react";

class TextDisplay extends React.Component {

    /**
     * Main constructur handling state for this component
     * @param {*} propertiers passed into the component
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pretty-json" style={{height: this.props.height, maxHeight: this.props.height}}>
                <pre>{ JSON.stringify(this.props.data, null, 2) }</pre>
            </div>
        );
    }
}

export default TextDisplay;