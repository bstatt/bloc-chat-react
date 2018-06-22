import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    // this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      rooms: [],
      messages: []
    }

  }

  // componentDidMount() {
  //   this.messagesRef.on('child_added', snapshot => {
  //     const room = snapshot.val();
  //     room.key = snapshot.key;
  //     this.setState({ rooms: this.state.messages.concat( snapshot.val() ) });
  //   });
  // }

  render() {
    return(
      <section className="message-list">
        <h1>Messages go here:</h1>
      </section>
    )
  }
}

export default MessageList;
