const core = require('@actions/core');
const fetch = require('node-fetch');

async function run() {
    try{
        const message = core.getInput('message', { required: true})
        const slackWebhook = core.getInput('slack-webhook', { required: true})

        const response = await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
        });

        if (!response.ok) {
        throw new Error(`Slack API responded with ${response.status}`);
        }
        console.log('Notification sent to Slack successfully!');

    } 
    catch (error) {
        core.setFailed(error.message);
    }
}

run();