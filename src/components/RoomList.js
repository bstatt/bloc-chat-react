import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: [],
      newChatRoom: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(event) {
    this.setState({ newChatRoom: event.target.value });
  }

  createRoom(event) {
    event.preventDefault();
    if(!this.state.newChatRoom) { return }
    const newRoom = { name: this.state.newChatRoom};
    this.setState({ rooms: [...this.state.rooms, newRoom], newChatRoom: ''})
    this.roomsRef.push({
      name: newRoom.name
    })
  }

  render() {
    return(
      <section className="room-list-section">
        <ul>
          {this.state.rooms.map((room) =>
              <li className="room-name" key={room.key} onClick={() => this.props.handleRoomClick(room)}>{room.name}</li>
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
