import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: [],
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:84e32cd1-d29d-437e-8c50-45f4b6a0ee33',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/84e32cd1-d29d-437e-8c50-45f4b6a0ee33/token'
            }),
        })

        chatManager.connect()
            .then(currentUser => {
                this.setState({currentUser})
                return currentUser.subscribeToRoomMultipart({
                    roomId: '8d3d7c64-3c19-4bcf-b523-d30884c52323',
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(username => username !== user.name)
                            })
                        }
                    }
                })
            }).then(currentRoom => {
                this.setState({currentRoom})
            })
            .catch(error => console.error(error))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    sendTypingEvent() {
        this.state.currentUser.isTypingIn({
            roomId: this.state.currentRoom.id
        }).catch(error => console.error(error))
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <MessageList messages={this.state.messages} />
                <p>{JSON.stringify(this.state.usersWhoAreTyping)}</p>
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
            </div>
        )
    }
}

export default ChatScreen;