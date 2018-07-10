import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      messages: []
    }

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  render() {
    return(
      <section className="message-list">
        <h1>Messages go here:</h1>
//takes each message object and filters out the messages that are associated with the active room. Then use map to return message content in a list.
        {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) => (
          <li key={index}>
            <span>{message.content}</span>
          </li>
  ))}
      </section>
    )
  }
}

export default MessageList;
