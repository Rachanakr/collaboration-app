const axios = require('axios');
require('dotenv').config(); // Load environment variables from a .env file

// Get the Slack Webhook URL from environment variables
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;

if (!slackWebhookURL) {
    console.error('Error: Slack Webhook URL is not set in environment variables.');
    process.exit(1); // Exit the application if the webhook URL is not set
}

const sendNotification = async (req, res) => {
    const { message } = req.body;

    // Validate the message
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: 'Valid message is required' });
    }

    try {
        // Send the Slack notification
        await axios.post(slackWebhookURL, { text: message });
        console.log('Slack notification sent successfully');
        res.status(200).json({ success: true, message: 'Notification sent!' });
    } catch (error) {
        console.error('Slack error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to send notification. Please try again later.',
        });
    }
};

module.exports = { sendNotification };

 
