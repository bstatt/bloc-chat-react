import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);

    this.state = {activeRoom: 'The Active Room'};

    this.handleRoomClick = this.handleRoomClick.bind(this);
  }

  handleRoomClick(event){
    const activeRoom = event.target.innerHTML;
    this.setState({
      activeRoom: activeRoom
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} handleRoomClick={this.handleRoomClick}/>
        <h2>{this.state.activeRoom}</h2>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
