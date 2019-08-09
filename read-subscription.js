#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'ack', 'a',
		'metadata', 'm'
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    read-from-pubsub-subscription <subscription>
Options:
	--format    -f  How to format the messages. json, raw, inspect (default)
	--ack       -a  Acknowledge the messages received.
	--encoding  -e  Encoding to decode the message payload with. Default: utf-8
	--metadata  -m  Print the message payload along its metadata.
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`${pkg.name} v${pkg.version}\n`)
	process.exit(0)
}

const {PubSub} = require('@google-cloud/pubsub')
const {inspect} = require('util')
const {isatty} = require('tty')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const subName = argv._[0]
if ('string' !== typeof subName || !subName) showError('subscription must be a non-empty string.')

const pubSub = new PubSub({
	// todo: remove `PUBSUB_PROJECT_ID` (breaking)
	projectId: argv.project || argv.p || process.env.GOOGLE_CLOUD_PROJECT || process.env.PUBSUB_PROJECT_ID
})
const subscription = pubSub.subscription(subName)

const encoding = argv.encoding || argv.e || 'utf-8'
const metadata = argv.metadata || argv.m

const inspectWithColor = isatty(process.stdout.fd)
const formats = Object.assign(Object.create(null), {
	json: val => JSON.stringify(val),
	raw: val => val + '',
	inspect: val => inspect(val, {depth: null, colors: inspectWithColor})
})
const format = formats[argv.format || argv.f] || formats.inspect
const ack = argv.ack || argv.a

subscription
.once('error', showError)
.on('message', (msg) => {
	const data = msg.data.toString(encoding)
	const item = metadata ? {
		id: msg.id,
		attributes: msg.attributes,
		publishTime: msg.publishTime,
		data
	} : data

	process.stdout.write(format(item) + '\n')
	if (ack) msg.ack()
})
