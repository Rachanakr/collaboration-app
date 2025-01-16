import React, { useState } from 'react';
import { sendNotification } from '../services/apiService';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const handleSubmit = async () => {
        await sendNotification(message);
        setMessage('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSubmit}>Send Notification</button>
        </div>
    );
};

export default Dashboard;

 
