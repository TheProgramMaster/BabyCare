import React from 'react';
import PropTypes from 'prop-types';

function Message({ message }) {
    const { senderName, content = "No content", timestamp, role='guest' } = message;
    const validTimestamp = !isNaN(new Date(timestamp).getTime()) ? new Date(timestamp).toLocaleTimeString() : 'Invalid timestamp';

    return (
        <div className="message-container">
            <div className="message-header">
                <h5>{message.id}</h5>
                <span className="sender-name">{senderName}</span>
                {role && <span className="sender-role">({role})</span>}
                <span className="message-timestamp">{validTimestamp}</span>
            </div>
            <div className="message-content">{content}</div>
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.shape({
        senderName: PropTypes.string.isRequired,
        role: PropTypes.string,
        content: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    }).isRequired,
};

Message.defaultProps = {
    message: {
        senderName: "Unknown",
        content: "",
        timestamp: Date.now(),
        role: 'guest'
    }
};

export default Message;