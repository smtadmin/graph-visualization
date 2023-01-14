import React from "react";

class TextDisplay extends React.Component {
    render() {
        return (
            <div className="pretty-json" style={{height: this.props.height, maxHeight: this.props.height}}>
                <pre>{ JSON.stringify(this.props.data, null, 2) }</pre>
            </div>
        );
    }
}

export default TextDisplay;