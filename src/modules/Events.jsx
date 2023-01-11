import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

class Events extends React.Component {


    getMessages = () => {
        let itemList=[];
        this.props.requestMessage.forEach((val, index) => {
            itemList.push(
                <ListItem key={index} onClick={() => { this.props.useHistory(val)}}>
                    <ListItemText primary={val.command} secondary={val.message} />
                </ListItem>)
        });

        return itemList;
    }

    render() {

        return (
            <>
                <Row><Col><h3>Event Log</h3></Col></Row>
                <Row>
                    <Col className="message-wrapper">
                        <List sx={{ height:200, overflow: "auto", width: '98%', bgcolor: 'background.paper' }}>
                            { this.getMessages(this.props.requestMessage)}
                        </List>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Events;