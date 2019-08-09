# google-pubsub-cli

**Publish to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/) topics and read from subscriptions.** Like `gcloud pubsub topics publish` & `gcloud pubsub subscriptions pull`, but

- works with the [Pub/Sub emulator](https://cloud.google.com/pubsub/docs/emulator) via the `PUBSUB_EMULATOR_HOST` environment variable,
- supports taking messages line-wise via `stdin`.

[![npm version](https://img.shields.io/npm/v/google-pubsub-cli.svg)](https://www.npmjs.com/package/google-pubsub-cli)
[![build status](https://api.travis-ci.org/derhuerst/google-pubsub-cli.svg?branch=master)](https://travis-ci.org/derhuerst/google-pubsub-cli)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/google-pubsub-cli.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install -g google-pubsub-cli
```

Or use [`npx`](https://npmjs.com/package/npx). ✨


## Usage

```
Usage:
    echo 'a new message' | publish-to-pubsub-topic <topic>
Options:
	--project   -p  The Google Cloud Project ID.
	--encoding  -e  Encoding to encode the message payload with. Default: utf-8
```

```
Usage:
    read-from-pubsub-subscription <subscription>
Options:
	--format    -f  How to format the messages. json, raw, inspect (default)
	--ack       -a  Acknowledge the messages received.
	--encoding  -e  Encoding to decode the message payload with. Default: utf-8
	--metadata  -m  Print the message payload along its metadata.
```

```
Usage:
    create-pubsub-topic <topic>
```

```
Usage:
    create-pubsub-subscription <topic> <subscription>
```


## Contributing

If you have a question or have difficulties using `google-pubsub-cli`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/google-pubsub-cli/issues).
