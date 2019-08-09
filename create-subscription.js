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
    create-pubsub-subscription <topic> <subscription>
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`${pkg.name} v${pkg.version}\n`)
	process.exit(0)
}

const createPubSub = require('./lib/pubsub')

const ALREADY_EXISTS = 6

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const topic = argv._[0]
if ('string' !== typeof topic || !topic) showError('topic must be a non-empty string.')
const subscription = argv._[1]
if ('string' !== typeof subscription || !subscription) {
	showError('subscription must be a non-empty string.')
}

createPubSub(argv.project || argv.p)
.createSubscription(topic, subscription)
.then(() => {
    console.info(`Subcription "${subscription}" created for topic "${topic}".`)
}, showError)
