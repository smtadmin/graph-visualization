import React  from 'react';

class Properties extends React.Component {

    constructor(props) {
        super(props);
        console.log("P Props", props);
        this.state = {data: null, nodeData: props.nodeData, eventData: props.eventData };
        
    }

    componentDidUpdate = (prevProps, props) => {
        console.log("**************************", props);
      }

    render() {
        return (
            <div id="properties-wrapper">
                <h3>Properties</h3>
                <div>
                    Event: {this.state.nodeData ? this.state.nodeData.id : "none"}
                </div>
            </div>
        )
    }
}

export default Properties;