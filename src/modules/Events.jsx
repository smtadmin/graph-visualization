import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

/****************************************************************************
 * <b>Title</b>: Events.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Display console of all logging events within the UI
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class Events extends React.Component {

    /**
     * Builds a colleciton of the events
     * @returns Collection of ListItems for each event
     */
    getMessages = () => {
        let itemList = [];
        this.props.requestMessage.forEach((val, index) => {
            itemList.push(
                <ListItem key={index}>
                    <ListItemText className="event-list" primary={val.command} secondary={val.message} />
                </ListItem>)
        });

        return itemList;
    }

    /**
     * Renders all fo the events in the system
     * @returns Event Panel
     */
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