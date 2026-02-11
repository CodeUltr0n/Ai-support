import React, { useState } from 'react';

export default function InputBox({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}