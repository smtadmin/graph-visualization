import React from 'react';
import { CypherEditor } from '@neo4j-cypher/react-codemirror';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearAll from '@mui/icons-material/ClearAll';

/****************************************************************************
 * <b>Title</b>: CypherMirror.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> IDE component to enter the Cypher commands to be processed
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class CypherMirror extends React.Component {

  /**
   * Initializes the class and assigns the default editor value to state
   * @param {*} props Editor value to assign.  Allows for clearing and history 
   * to be assigned
   */
  constructor(props) {
    super(props);
    this.state = { editorValue: props.editorValue };
  }

  /**
   * Default properties for the editor including all of the callbacks
   */
  editorProps = {
    onValueChanged: value => { this.setState({ editorValue: value }) }, // optional
    onFocusChanged: focused => { }, // optional
    onScrollChanged: scrollInfo => { }, // optional
    onPositionChanged: ({ line, column, position }) => { }, // optional
    //setValue: value => { this.getEditorValue() },
    initialOptions: {
      theme: 'light', // optional, defaults to light
      extensions: [ /* override extensions  */] // optional, defaults to a sensible list of extensions.
    },
    initialSchema: { /* ... */ }, // optional, see example in demos
    initialPosition: { row: 2, column: 3 },  // optional, rows are 1 based, columns are 0 based
    classNames: [], // optional, array of classnames to add to the root dom element.
    autocompletion: true,
    theme: 'light' // optional, should be light or dark, defaults to light
  };

  /**
   * Displays the cypher editor panel as well as the clear and execute icons
   * @returns Rendered component
   */
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={10} md={10}>
              <h3>Cypher Commands</h3>
            </Col>
            <Col className="row-header" xs={2} md={2}>
              <IconButton onClick={() => this.props.sendCypher(this.state.editorValue)} aria-label="Execute" title="Execute">
                <PlayArrowIcon />
              </IconButton>
              <IconButton onClick={() => this.props.clearEditor()}  aria-label="Clear Panel" title="Clear Panel">
                <ClearAll />
              </IconButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10}>
              <CypherEditor value={this.props.editorValue} {...this.editorProps} />
            </Col>
          </Row>
        </Container>
      </>


    );
  }
}

export default CypherMirror;