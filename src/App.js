import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQ2OD7lPx_ArgprAkNV1X7VXDx-FLKkX8",
    authDomain: "bloc-chat-cabf9.firebaseapp.com",
    databaseURL: "https://bloc-chat-cabf9.firebaseio.com",
    projectId: "bloc-chat-cabf9",
    storageBucket: "bloc-chat-cabf9.appspot.com",
    messagingSenderId: "98841391005"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
