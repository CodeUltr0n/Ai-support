import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Message({ sender, text }) {
  // Simple timestamp for demo purposes
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        {/* We can use ReactMarkdown if installed, otherwise just text with line breaks */}
        {sender === 'agent' ? (
           <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>
        ) : (
          <p>{text}</p>
        )}
      </div>
      <div style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.7, textAlign: 'right' }}>
        {time}
      </div>
    </div>
  );
}