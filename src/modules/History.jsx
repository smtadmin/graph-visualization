import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import parse from "html-react-parser";

class History extends React.Component {

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