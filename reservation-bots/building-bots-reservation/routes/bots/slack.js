const express = require('express');
const { createEventAdapter } = require('@slack/events-api');

const router = express.Router();

module.exports = (params) => {
    const { config } = params;

    const slackEvents = createEventAdapter(config.slack.signingSecret, { includeBody: true, includeHeaders: true, waitForResponse: true });

    router.use('/events', slackEvents.requestListener());

    return router;
};
