import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: [],
      roomInput: ''
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
    this.setState({roomInput: event.target.value})
  }

  createRoom(event) {
    const newRoom = this.state.roomInput;
    this.roomsRef.push({
      name: newRoom
    })
    event.preventDefault();
  }

  render() {
    return(
      <section className="room-list-section">
        <ul>
          {this.state.rooms.map((room, index) =>
              <li className="room-name" key={index}>{room.name}</li>
          )}
       </ul>
       <form className="add-room-form" onSubmit={this.createRoom}>
        <input type="text" name="room-name" value={this.state.roomInput} onChange={this.handleChange}/>
        <input type="submit" value="Create Room" />
       </form>
      </section>
    )
  }
}

export default RoomList;
