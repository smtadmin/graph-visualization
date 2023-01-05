import React from "react";
import { Nav } from "react-bootstrap";

class DataNavBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { data: null };
  }

  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Graph</Nav.Link>
        <Nav.Link eventKey="link-1">Schema</Nav.Link>
        <Nav.Link eventKey="link-2">Table</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav>
    );
  }
}

export default DataNavBar;
