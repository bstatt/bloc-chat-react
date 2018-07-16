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
      <section className="room-list-section col-sm-4">
        <form className="add-room-form" onSubmit={this.createRoom}>
          <div className="input-group mb-3">
            <input className="input-group" type="text" name="room-name" value={this.state.newChatRoom} onChange={this.handleChange}/>
            <div className="input-group-append">
              <input className="btn btn-outline-secondary" type="submit" value="Create Room" />
            </div>
          </div>
        </form>
        <ul className="list-group">
          {this.state.rooms.map((room) =>
              <li className="room-name list-group-item list-group-item-action" key={room.key} onClick={() => this.props.handleRoomClick(room)}>{room.name}</li>
          )}
       </ul>
      </section>
    )
  }
}

export default RoomList;
