import React  from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parse from "html-react-parser";

class History extends React.Component {

    getDisplayItems = (items) => {
        let itemList=[];
        items.forEach((val, index) => {
            if (!val) return;
            
            let item = val;
            let lines = val.split(/\n/);
            if (lines.length > 1) {
                item = "";
                lines.forEach((line, index) => {
                    item += line;
                    if ((index + 1) < lines.length) item += "<br/>";
                });
            }

            ( 
            itemList.push(
                <ListItem sx={{backgroundColor: "lightBlue", marginBottom: "10px"}} key={index} onClick={() => { this.props.useHistory(val)}}>
                    <ListItemText primary={parse(item)} />
                </ListItem>))
        });

        return itemList;
        
    }

    render() {
        

        return (
            <>
            <Row className="row-header"><Col><h3>History</h3></Col></Row>
            <Row className="history-list">
                <Col>
                    <List sx={{ height:200, overflow: "auto", width: '98%', bgcolor: 'background.paper' }}>
                        { this.getDisplayItems(this.props.data)}
                    </List>
                </Col>
            </Row>
            </>
        )
    }
}

export default History;