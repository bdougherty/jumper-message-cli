#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import meow from 'meow';
import getStdin from 'get-stdin';
import jumper from 'jumper-message';
import updateNotifier from 'update-notifier';

const packageJson = readFileSync(new URL('./package.json', import.meta.url));
const { name, version } = JSON.parse(packageJson);
updateNotifier({
	pkg: {
		name,
		version
	}
}).notify();

const cli = meow(`
	Usage
	  $ jumper-message <string>
	  $ echo <string> | jumper-message

	Options
	  --floors         Number of additional floors to add (Default: 0)
	  --compact        Remove extra spacing between message lines (Default: false)
	  --gradient       Render the text as a gradient (Default: none)
	  --building-style Chalk style string for the building (Default: gray)
	  --message-style  Chalk style string for the message (Default: bold.white)
	  --person-style   Chalk style string for the person (Default: white)

	Examples
	  jumper-message 'Friday deploy, good luck!'
	  jumper-message 'Friday deploy, good luck!' --gradient=rainbow
	  jumper-message 'Friday deploy, good luck!' --floors=4
	  jumper-message 'Friday deploy, good luck!' --compact --message-style=bold.red.bgWhite
`, {
	importMeta: import.meta,
	flags: {
		floors: {
			type: 'number',
			default: 0
		},
		compact: {
			type: 'boolean',
			default: false
		},
		gradient: {
			type: 'string',
			default: 'none'
		},
		buildingStyle: {
			type: 'string',
			default: 'gray'
		},
		messageStyle: {
			type: 'string',
			default: 'bold.white'
		},
		personStyle: {
			type: 'string',
			default: 'white'
		}
	}
});

(async () => {
	const stdin = await getStdin();
	let message = stdin.trim();

	if (message === '') {
		message = cli.input.join(' ');
	}

	const output = jumper(message, {
		...cli.flags,
		extraFloors: cli.flags.floors,
		gradient: cli.flags.gradient === 'none' ? false : cli.flags.gradient
	});

	console.log(output);
})();
