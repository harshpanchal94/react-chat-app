import React from 'react';

class MessageList extends React.Component {

    render() {
        const styles = {
            chatList: {
                display: 'flex',
                flex: 1
            }
        }
        return (
            <div style={styles.chatList}>
                <ul>
                    {this.props.messages.map((message, index) => (
                        <li style={{ marginTop: '1em' }} key={index}>
                            <span style={{ 
                                fontSize: 'small',
                                fontWeight: 'lighter'
                             }}>{message.senderId}</span>
                            <p>{message.parts[0].payload.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MessageList;