import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Editor from './Editor/Editor';

import firebase from 'firebase';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      })
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  }

  noteUpdate = (id, noteObj) => {
    // console.log(id, noteObj);
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    }

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] })

  }

  render() {
    return (
      <div className='app-container'>
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
            <Editor
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
            /> :
            null
        }
      </div>
    );
  }
}

export default App;
