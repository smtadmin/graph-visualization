import '../App.css';
import React  from 'react';
import Graph from './Graph'
import CypherMirror from './CypherMirror'
import Properties from './Properties'
import History from './History'
import Events from './Events'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

const history = new Set();
class BrowserLayout extends React.Component {

    constructor(props) {
        super(props);
        history.add("match(n) return n");
        this.state = {data: null, nodeData:null, eventData:null, linkData:null, history: new Set(history), editorValue: ""};
        
    }

    nodeClick = async (node, _event) => {
      this.setState({eventData: _event, nodeData: node, linkData: null}) ;
    }

    linkClick = (link, _event) => {
      this.setState({eventData: _event, linkData: link, nodeData: null});
    }


    sendCypher = (value) => {
      // Update History
      history.add(value.trim());
      this.setState({history : history});      
    }

    useHistory = (value) => {
      console.log(value);
      this.setState({editorValue : value });
    }

    render() {
        return (
            <>
              <Container fluid>
                <Row>
                  <Col xs={12} md={8} id="graph-wrapper">
                    <Graph onNodeClick={this.nodeClick} onLinkClick={this.linkClick}/>
                  </Col>
                  <Col xs={6} md={4}>
                    <Properties nodeData={this.state.nodeData} linkData={this.state.linkData} eventData={this.state.eventData} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div id="code-wrapper">
                        <CypherMirror sendCypher={this.sendCypher} editorValue={ this.state.editorValue }/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} md={8}>
                    <Events />
                  </Col>
                  <Col xs={4} md={4}>
                    <History data={this.state.history} useHistory={this.useHistory}/>
                  </Col>
                </Row>
              </Container>
            </>
          );
      }
  }
  
  export default BrowserLayout;
