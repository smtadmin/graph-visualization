import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import parse from "html-react-parser";

/****************************************************************************
 * <b>Title</b>: History.jsx
 * <b>Project</b>: graph-visualization
 * <b>Description: </b> Displays a list of previous commands and adds a click 
 * event to each so the command can be rerun
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 1.0
 * @since January 3, 2022
 * @updates:
 ****************************************************************************/
class History extends React.Component {

    /**
     * Formats each row in the list of items to be displayed
     * @param {*} items Set of elements to be displayed
     * @returns Collection of ListItem components
     */
    getDisplayItems = (items) => {
        let itemList = [];
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
                    <ListItem className="history-list" key={index} onClick={() => { this.props.useHistory(val) }}>
                        <ListItemText primary={parse(item)} />
                    </ListItem>))
        });

        return itemList;

    }

    /**
     * Builds the list of history commands
     * @returns List of commands
     */
    render() {
        return (
            <div className="history-wrapper">
                <h3>History</h3>
                <List className="history-list-wrapper">
                    {this.getDisplayItems(this.props.data)}
                </List>
            </div>
        )
    }
}

export default History;