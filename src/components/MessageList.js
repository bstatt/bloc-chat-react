import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      messages: [],
      newMessage: {
        content: '',
        roomId: '',
        sentAt: '',
        username: ''
      }
    }

    this.addMessage = this.addMessage.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleMessageInput(event){
    this.setState({
      newMessage: { content: event.target.value }
    });
  }

  addMessage(event){
    event.preventDefault();
    if(!this.state.newMessage.content) { return }
    const newMessage = this.state.newMessage;
    this.setState({ messages : [...this.state.messages, newMessage], newMessage: {content: ''}});
    this.messagesRef.push({
      content: this.state.newMessage.content,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: !this.props.user ? 'Guest' : this.props.user.displayName
    })
  }

  render() {
    return(
      <section className="message-list">
        <h1>Messages go here:</h1>
        {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) => (
          <li key={index}>
            <ul>
              <li>{message.username}</li>
              <li>{message.content}</li>
              <li>{message.sentAt}</li>
            </ul>
          </li>
        ))}
        <form className="add-message-form" onSubmit={this.addMessage}>
          <label htmlFor="enter-message">Enter Message:</label>
          <textarea id="enter-message" value={this.state.newMessage.content} onChange={this.handleMessageInput}></textarea>
          <input type="submit" value="Send Message"/>
        </form>
      </section>
    )
  }
}

export default MessageList;
