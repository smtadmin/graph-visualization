import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

class Events extends React.Component {


    getMessages = () => {
        let itemList = [];
        this.props.requestMessage.forEach((val, index) => {
            itemList.push(
                <ListItem key={index} onClick={() => { this.props.useHistory(val) }}>
                    <ListItemText className="event-list" primary={val.command} secondary={val.message} />
                </ListItem>)
        });

        return itemList;
    }

    render() {

        return (
            <div className="history-wrapper">
                <List className="event-list-wrapper">
                    {this.getMessages(this.props.requestMessage)}
                </List>
            </div>
        )
    }
}

export default Events;