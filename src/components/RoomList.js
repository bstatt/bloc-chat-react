import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: [],
      roomInputs: [
        {name: '', isEntered: ''}
      ],
      newChatRoom: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( snapshot.val() ) });
    });
  }

  handleChange(event) {
    this.setState({ newChatRoom: event.target.value });
  }

  createRoom(event) {
    event.preventDefault();
    if(!this.state.newChatRoom) { return }
    const newRoom = { name:this.state.newChatRoom, isEntered: true };
    this.setState({ roomInputs: [...this.state.roomInputs, newRoom], newChatRoom: ''})
    this.roomsRef.push({
      name: newRoom.name
    })

  }

 //  handleSubmit(e) {
 //   e.preventDefault();
 //   if (!this.state.newTodoDescription) { return }
 //   const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
 //   this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
 // }

  render() {
    return(
      <section className="room-list-section">
        <ul>
          {this.state.rooms.map((room, index) =>
              <li className="room-name" key={index}>{room.name}</li>
          )}
       </ul>
       <form className="add-room-form" onSubmit={this.createRoom}>
        <input type="text" name="room-name" value={this.state.newChatRoom} onChange={this.handleChange}/>
        <input type="submit" value="Create Room" />
       </form>
      </section>
    )
  }
}

export default RoomList;
