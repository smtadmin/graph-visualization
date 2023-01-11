import '../App.css';
import React from 'react';
import Graph from './Graph'
import CypherMirror from './CypherMirror'
import Properties from './Properties'
import History from './History'
import Events from './Events'
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
class BrowserLayout extends React.Component {

  /**
   * Main constructur handling state for this component
   * @param {*} propertiers passed into the component
   */
  constructor(props) {
    super(props);
    history.add("match(n) return n");
    this.state = { data: null, nodeData: null, eventData: null, linkData: null, history: new Set(history), editorValue: "", requestMessage: requestMessage };

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
    console.log(res.data.data);
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

  /**
   * Lays out and renders the page
   * @returns Bootstrap conatiner displaying the entire page
   */
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} id="graph-wrapper">
              <Graph data={this.state.data} onNodeClick={this.nodeClick} onLinkClick={this.linkClick} />
            </Col>
            <Col xs={6} md={4} className="properties-wrapper">
              <Properties nodeData={this.state.nodeData} linkData={this.state.linkData} eventData={this.state.eventData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="code-wrapper">
                <CypherMirror clearEditor={this.clearEditor} sendCypher={this.sendCypher} editorValue={this.state.editorValue} />
              </div>
            </Col>
          </Row>
          <Row>
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
