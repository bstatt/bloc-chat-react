import React, { Component } from 'react';

class User extends Component {
  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut()
  }

  render(){
    return(
      <section className="sign-in-section">
        <h3>Welcome {!this.props.user ? 'Guest' : this.props.user.displayName}</h3>
        <button onClick={this.signIn.bind(this)}>Sign In</button>
        <button onClick={this.signOut.bind(this)}>Sign Out</button>
      </section>
    )
  }
}

export default User;
