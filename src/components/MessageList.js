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
      <section className="message-list col">
        <h3>{this.props.activeRoom.name}</h3>
        <ul className='list-group'>
        {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) => (
          <li key={index} className='list-group-item list-group-item-action flex-column align-items-start'>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{message.username}</h5>
              <small>{message.sentAt}</small>
            </div>
            <p className="mb-1">{message.content}</p>
            <small className="text-muted">online</small>
          </li>
        ))}
        </ul>
        <form className="add-message-form" onSubmit={this.addMessage}>
          <div className="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Enter Message</span>
            </div>
            <textarea className="form-control" id="enter-message" value={this.state.newMessage.content} onChange={this.handleMessageInput}></textarea>
            <input className="btn btn-primary btn-lg" type="submit" value="Send"/>
          </div>
        </form>
      </section>
    )
  }
}

export default MessageList;
