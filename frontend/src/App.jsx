import { useState } from 'react'
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (msg) => {
    // 1. Add the user message
    const userMessage = { sender: 'user', text: msg };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, email: 'user@test.com' }),
      });

      const data = await res.json();

      //Adding the agent reply
      let agentText = '';
      if (data.responseType === 'ORDER_STATUS' && data.data && typeof data.data === 'object') {
        const order = data.data;
        const itemsSummary = order.items?.map(item => {
          const productName = item.product?.name || 'Unknown';
          return `- ${productName} x${item.quantity}`;
        }).join('\n') || 'No items';
        agentText = `Order Summary:
             Order ID: ${order.id || 'N/A'}
             Status: ${order.status || 'N/A'}
             Total Amount: $${order.totalAmount !== undefined ? order.totalAmount : 'N/A'}
             Tracking Number: ${order.trackingNumber || 'Not available'}
             Shipping Address: ${order.shippingAddress || 'N/A'}
             Items:
          ${itemsSummary}`;
            } else if (data.data && typeof data.data === 'object') {
               agentText = JSON.stringify(data.data, null, 2);
            } else {
              agentText = data.data || '';
            }

      const agentMessage = {
        sender: 'agent',
        text: agentText
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <>
      <div className="app-container">
        <h1>AI-powered customer support system</h1>
        <ChatWindow messages={messages}/>
        <InputBox onSend={handleSend}/>
      </div>
    </>
  )
}

export default App
