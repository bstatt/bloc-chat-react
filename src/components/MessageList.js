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
      console.log(message)
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( snapshot.val() ) });
    });
  }

  render() {
    return(
      <section className="message-list">
        <h1>Messages go here:</h1>
      </section>
    )
  }
}

export default MessageList;
