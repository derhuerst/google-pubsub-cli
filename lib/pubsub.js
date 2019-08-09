'use strict'

const {PubSub} = require('@google-cloud/pubsub')

const createPubSub = (projectId = null) => {
	return new PubSub({
		// todo: remove `PUBSUB_PROJECT_ID` (breaking)
		projectId: projectId || process.env.GOOGLE_CLOUD_PROJECT || process.env.PUBSUB_PROJECT_ID
	})
}

module.exports = createPubSub
