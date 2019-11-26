import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../SidebarItem/SidebarItem';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingNote: false,
            title: null
        }
    }

    newNoteBtnClick = () => {
        console.log('new note btn clicked');
        this.setState({
            title: null,
            addingNote: !this.state.addingNote
        });
    }

    updateTitle = (text) => {
        // console.log('Here it is: ', text);
        this.setState({ title: text });
    }

    newNote = () => {
        console.log(this.state);
    }

    selectNote = (n, i) => {
        // console.log('select note!');
        this.props.selectNote(n, i);
    }

    deleteNote = () => {
        console.log('delete note');
    }

    render() {
        const { notes, classes, selectedNoteIndex } = this.props;

        if (notes) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >
                        {this.state.addingNote ? 'Cancel' : 'New Note'}
                    </Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input type='text'
                                    className={classes.newNoteInput}
                                    placeholder='Enter note title'
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                />
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNote}
                                >
                                    Submit Note
                                    </Button>
                            </div> :
                            null
                    }
                    <List>
                        {
                            notes.map((note, index) => {
                                return (
                                    <div key={index}>
                                        <SidebarItem
                                            note={note}
                                            index={index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        />
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            );

        } else {
            return (<div></div>);
        }
    }
}


export default withStyles(Styles)(Sidebar);