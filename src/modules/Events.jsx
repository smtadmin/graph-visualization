import React  from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Events extends React.Component {
    render() {
        
        return (
            <>
            <Row><Col><h3>Event Log</h3></Col></Row>
            <Row>
                <Col className="message-wrapper">
                    Successfully Completed Request
                </Col>
            </Row>
            </>
        )
    }
}

export default Events;