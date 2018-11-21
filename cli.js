#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const jumper = require('jumper-message');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
	Usage
	  $ jumper-message <string>
	  $ echo <string> | jumper-message

	Options
	  --floors         Number of additional floors to add (Default: 0)
	  --compact        Remove extra spacing between message lines (Default: false)
	  --gradient       Render the text as a gradient (Default: false)
	  --building-style Chalk style string for the building (Default: gray)
	  --message-style  Chalk style string for the message (Default: bold.white)
	  --person-style   Chalk style string for the person (Default: white)

	Examples
	  jumper-message 'Friday deploy, good luck!'
	  jumper-message 'Friday deploy, good luck!' --gradient=rainbow
	  jumper-message 'Friday deploy, good luck!' --floors=4
	  jumper-message 'Friday deploy, good luck!' --compact --message-style=bold.red.bgWhite
`, {
	flags: {
		floors: {
			type: 'string',
			default: '0'
		},
		compact: {
			type: 'boolean',
			default: false
		},
		gradient: {
			type: 'string',
			default: false
		},
		buildingStyle: {
			type: 'string',
			default: null
		},
		messageStyle: {
			type: 'string',
			default: null
		},
		personStyle: {
			type: 'string',
			default: null
		}
	}
});

(async () => {
	const stdin = await getStdin();
	let message = stdin.trim();

	if (message === '') {
		message = cli.input.join(' ');
	}

	if (cli.flags.gradient === '') {
		cli.flags.gradient = true;
	}

	const config = {
		extraFloors: parseInt(cli.flags.floors, 10),
		compact: cli.flags.compact,
		gradient: cli.flags.gradient
	};

	if (cli.flags.buildingStyle) {
		config.buildingStyle = cli.flags.buildingStyle;
	}

	if (cli.flags.messageStyle) {
		config.messageStyle = cli.flags.messageStyle;
	}

	if (cli.flags.personStyle) {
		config.personStyle = cli.flags.personStyle;
	}

	const output = jumper(message, config);
	console.log(output);
})();
