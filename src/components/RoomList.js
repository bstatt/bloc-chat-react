import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( snapshot.val() ) });
    });
  }

  render() {
    return(
      <section className="room-list-section">
        <ul>
          {this.state.rooms.map((room, index) =>
              <li className="room-name" key={index}>{room.name}</li>
          )}
       </ul>
      </section>
    )
  }
}

export default RoomList;
