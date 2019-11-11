import React from 'react';

class MessageList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.messages.map((message, index) => (
                    <li key={index}>
                        <span>{message.senderId}</span>
                        <p>{message.parts[0].payload.content}</p>
                    </li>
                ))}
            </ul>
        )
    }
}

export default MessageList;