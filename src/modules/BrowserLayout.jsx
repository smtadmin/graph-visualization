import '../App.css';
import React from 'react';
import Graph from './Graph'
import TextDisplay from './TextDisplay'
import GridDisplay from './GridDisplay'
import CypherMirror from './CypherMirror'
import Properties from './Properties'
import History from './History'
import Events from './Events'
import IconPanel from './IconPanel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

/****************************************************************************
 * <b>Title</b>: BrowserLayout.jsx.java
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Main display/controller for the APM graph display
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
const url = "http://localhost:8085/query/12345";
const history = new Set();
const requestMessage = [];
var height = 500;
class BrowserLayout extends React.Component {

  /**
   * Main constructur handling state for this component
   * @param {*} propertiers passed into the component
   */
  constructor(props) {
    super(props);
    history.add("match(n) return n");
    this.state = { data: null, nodeData: null, eventData: null, linkData: null, history: new Set(history), editorValue: "", requestMessage: requestMessage, graphType: "GRAPH"};

  }

  componentDidMount() {
    height = this.divElement.clientHeight;
  }

  /**
   * Callback when a node is clicked on the graph.  Updates the appropriate 
   * state variables
   * @param {*} node Node object information
   * @param {*} _event Event object iinformation
   */
  nodeClick = async (node, _event) => {
    this.setState({ eventData: _event, nodeData: node, linkData: null });
  }

  /**
   * Callback when a relationship is clicked on the graph.  Updates the appropriate 
   * state variables
   * @param {*} link Link object information
   * @param {*} _event Event object iinformation
   */
  linkClick = (link, _event) => {
    link.source.serviceName=this.state.data.nodes.find(x => x.id === link.source.id).properties.serviceName;
    link.target.serviceName=this.state.data.nodes.find(x => x.id === link.target.id).properties.serviceName;
    this.setState({ eventData: _event, linkData: link, nodeData: null });
  }

  /**
   * Updates the Code Mirror console to be cleared
   */
  clearEditor = () => {
    this.setState({ editorValue: "" });
  }

  /**
   * Retrieves the data form the graph-display-ui for the given command
   * @param {String} command Cypher command to be executed
   */
  async getData(command) {
    const res = await axios.post(url, {
      "query": command,
      "includeRelationships": true
    })

    requestMessage.unshift({command: command, message: res.data.message ? res.data.message : "Query Completed Successfully"});
    this.setState({ data : res.data.data, requestMessage : requestMessage});
  }

  /**
   * Callback when the execute button is selected in the Code Mirror Editor
   * @param {String} value Command to be executed
   */
  sendCypher = (value) => {
    // Update History
    history.add(value.trim());
    this.setState({ history: history });
    this.getData(value);
  }

  /**
   * Callback when a command is selected in histroy panel.  This updates state
   * so that the code miiror panel will display the command
   * @param {String} value Command to place in the editor
   */
  useHistory = (value) => {
    this.setState({ editorValue: value });
  }

  displayGraphType = (type) => {
    console.log("Changing: " + type);
    this.setState({ graphType : type});
  }

  getGraph = () => {
    if (! this.state.data) return (<div className="graph-label">Submit a Cypher command</div>);
    else if (this.state.graphType === "TEXT") return(<TextDisplay data={this.state.data} height={height}/>);
    else if (this.state.graphType === "GRID") return(<GridDisplay data={this.state.data} />);
    else if (this.state.graphType === "DAG") return(<GridDisplay data={this.state.data} />);
    else if (this.state.graphType === "GRAPH") return (<Graph data={this.state.data} onNodeClick={this.nodeClick} onLinkClick={this.linkClick} height={height}/>);
    else return (<div className="graph-label">Submit a Cypher command</div>);
  }

  /**
   * Lays out and renders the page
   * @returns Bootstrap conatiner displaying the entire page
   */
  render() {
    return (
      <>
        <Container fluid className="vh-100 d-flex flex-column my-container">
          <Row className="row-header"></Row>
          <Row id="inner-row-1" ref={ (divElement) => { this.divElement = divElement } }>
            <Col xs={1} md={1} className="display-type-panel">
              <IconPanel displayGraphType={this.displayGraphType}/>
            </Col>
            <Col xs={8} md={8} id="graph-wrapper">
              { this.getGraph()}
            </Col>
            <Col className="properties-wrapper">
              <Properties nodeData={this.state.nodeData} linkData={this.state.linkData} eventData={this.state.eventData} />
            </Col>
          </Row>
          <Row id="inner-row-2">
            <Col>
              <div id="code-wrapper">
                <CypherMirror clearEditor={this.clearEditor} sendCypher={this.sendCypher} editorValue={this.state.editorValue} />
              </div>
            </Col>
          </Row>
          <Row className="row-header"><h3>Event Log</h3></Row>
          <Row id="inner-row-3">
            <Col xs={8} md={8}>
                <Events requestMessage={this.state.requestMessage}/>
            </Col>
            <Col xs={4} md={4}>
                <History data={this.state.history} useHistory={this.useHistory} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BrowserLayout;
