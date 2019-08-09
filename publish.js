#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v'
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    echo 'a new message' | publish-to-pubsub-topic <topic>
Options:
	--project   -p  The Google Cloud Project ID.
	--encoding  -e  Encoding to encode the message payload with. Default: utf-8
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`${pkg.name} v${pkg.version}\n`)
	process.exit(0)
}

const {PubSub} = require('@google-cloud/pubsub')
const split = require('split2')
const {Writable} = require('stream')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const encoding = argv.encoding || argv.e || 'utf-8'

const topicName = argv._[0]
if ('string' !== typeof topicName || !topicName) showError('topic must be a non-empty string.')

const pubSub = new PubSub({
	// todo: remove `PUBSUB_PROJECT_ID` (breaking)
	projectId: argv.project || argv.p || process.env.GOOGLE_CLOUD_PROJECT || process.env.PUBSUB_PROJECT_ID
})
const topic = pubSub.topic(topicName)

// todo: support binary input
process.stdin
.once('error', showError)
.pipe(split())
.once('error', showError)
.pipe(new Writable({
	objectMode: true,
	write: (msg, _, cb) => {
		topic.publish(Buffer.from(msg, encoding))
		.then(() => cb(), err => cb(err))
	}
}))
.once('error', showError)
