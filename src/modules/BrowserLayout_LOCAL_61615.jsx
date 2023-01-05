import '../App.css';
import React  from 'react';
import Graph from './Graph'
import CypherMirror from './CypherMirror'
import Properties from './Properties'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

class BrowserLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: null, nodeData:null, eventData:null, linkData:null};
    }

    nodeClick = async (node, _event) => {
      console.log("Node", node);
      console.log("Event", _event);

      this.setState({eventData: _event, nodeData: node, linkData: null}, () =>{
        console.log(this.state);
      }) ;
    }

    linkClick = (node, _event) => {
      console.log("rNode", node);
      console.log("rEvent", _event);
      this.setState({eventData: _event});
    }

    render() {
        return (
            <>
              <Container fluid>
                <Row>
                  <Col xs={12} md={8} id="graph-wrapper">
                    <Graph onNodeClick={(node, event) => this.nodeClick(node, event)} onLinkClick={this.linkClick}/>
                  </Col>
                  <Col xs={6} md={4}>
                    <Properties nodeData={this.state.nodeData} linkData={this.state.linkData} eventData={this.state.eventData} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    
                    <div id="code-wrapper">
                        <h3>Cypher Commands</h3>
                        <CypherMirror />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>foo</Col>
                  <Col xs={4}>bar</Col>
                </Row>
              </Container>
            </>
          );
      }
  }
  
  export default BrowserLayout;