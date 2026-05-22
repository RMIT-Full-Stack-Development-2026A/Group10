// src/components/Game/ChatBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const ChatBox = ({ socket, roomId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('receiveMessage', (messageData) => {
            setMessages((prev) => [...prev, messageData]);
        });

        return () => socket.off('receiveMessage');
    }, [socket]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (currentMessage.trim() !== '' && socket) {

            console.log("Front-end sending to room:", roomId, "Message:", currentMessage);
            
            socket.emit('sendMessage', {
                room: roomId,
                message: currentMessage,
                sender: currentUser || 'Player'
            });
            setCurrentMessage(''); 
        }
    };

    return (
        <Card title="Live Chat" className="chat-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px' }}>
                {messages.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>No messages yet. Say hi!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '15px', textAlign: msg.sender === currentUser ? 'right' : 'left' }}>
                            <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '4px' }}>
                                {msg.sender} • {msg.timestamp}
                            </span>
                            <div style={{ 
                                display: 'inline-block', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%', wordBreak: 'break-word',
                                backgroundColor: msg.sender === currentUser ? '#4CAF50' : '#e0e0e0',
                                color: msg.sender === currentUser ? 'white' : '#333'
                            }}>
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <Input 
                        name="chat" 
                        placeholder="Type a message..." 
                        value={currentMessage} 
                        onChange={(e) => setCurrentMessage(e.target.value)} 
                    />
                </div>
                <div style={{ width: '80px' }}>
                    <Button type="submit" variant="primary">Send</Button>
                </div>
            </form>
        </Card>
    );
};