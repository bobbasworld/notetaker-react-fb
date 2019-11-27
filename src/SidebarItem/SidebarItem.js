import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        const { index, note, classes, selectedNoteIndex } = this.props;

        return (
            <div key={index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === index}
                    alignItems='flex-start'
                >
                    <div
                        className={classes.textSection}
                        onClick={() => this.selectNote(note, index)}
                    >
                        <ListItemText
                            primary={note.title}
                            secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}
                        >
                        </ListItemText>
                    </div>
                    <DeleteIcon className={classes.deleteIcon} onClick={() => this.deleteNote(note)}></DeleteIcon>

                </ListItem>
            </div>
        );
    }

    selectNote = (n, i) => this.props.selectNote(n, i);

    deleteNote = (note) => {
        if (window.confirm(`Are you sure you want to delete: ${note.title} ?`)) {
            this.props.deleteNote(note);
        }
    }
}

export default withStyles(Styles)(SidebarItem);