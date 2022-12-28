import "../App.css";
import React from "react";
import Graph from "./Graph";
import CypherMirror from "./CypherMirror";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

class BrowserLayout extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { data: null };
  }

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} id="graph-wrapper">
              <Graph />
            </Col>
            <Col xs={6} md={4}>
              <div id="properties-wrapper">
                <h3>Properties</h3>
              </div>
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
