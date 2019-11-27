import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';


class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount() {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        })
    }

    componentDidUpdate() {
        if (this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            })
        }
    }


    updateBody = async (val) => {
        await this.setState({ text: val });
        this.update();
    }

    updateTitle = async (txt) => {
        await this.setState({ title: txt });
        this.update();
    }

    update = debounce(() => {
        // come back later
        // console.log('updating database');
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500);

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    type="text"
                    className={classes.titleInput}
                    placeholder='Note Title...'
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.updateTitle(e.target.value)}
                />
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}
                >

                </ReactQuill>
            </div>
        );
    }

}

export default withStyles(Styles)(Editor);