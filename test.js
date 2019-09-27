import test from 'ava';
import execa from 'execa';

test('help output', async (t) => {
	const { stdout } = await execa('./cli.js', ['--help']);
	t.true(stdout.length > 0);
});

test('stdin', async (t) => {
	const { stdout } = await execa('./cli.js', [], {
		input: 'friday deploy, good luck!'
	});

	t.true(stdout.includes('friday'));
	t.true(stdout.includes('deploy,'));
	t.true(stdout.includes('good luck!'));
});

test('input args', async (t) => {
	const { stdout } = await execa('./cli.js', ['friday', 'deploy,', 'good', 'luck!'], {
		input: ''
	});

	t.true(stdout.includes('friday'));
	t.true(stdout.includes('deploy,'));
	t.true(stdout.includes('good luck!'));
});
