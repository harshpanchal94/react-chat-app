import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './chatScreen';

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: '',
    };

    this.onUserNameSubmit = this.onUserNameSubmit.bind(this);
  }
  onUserNameSubmit(username) {
    fetch(`http://localhost:3001/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username}),
    }).then(response => {
      this.setState({ currentUsername: username, currentScreen: 'ChatScreen' })
    }).catch(error => {
      console.error(error)
    })
  }
  render() {
    const { currentScreen, currentUsername } = this.state;

    if(currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUserNameSubmit} />
    } else if(currentScreen === 'ChatScreen'){
      return <ChatScreen currentUsername={currentUsername} />
    }
    
  }
}

export default App
