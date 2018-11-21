import test from 'ava';
import execa from 'execa';

test('help output', async (t) => {
	const result = await execa.stdout('./cli.js', ['--help']);
	t.true(result.length > 0);
});

test('stdin', async (t) => {
	const result = await execa.stdout('./cli.js', [], {
		input: 'friday deploy, good luck!'
	});

	t.true(result.includes('friday'));
	t.true(result.includes('deploy,'));
	t.true(result.includes('good luck!'));
});

test('input args', async (t) => {
	const result = await execa.stdout('./cli.js', ['friday', 'deploy,', 'good', 'luck']);

	t.true(result.includes('friday'));
	t.true(result.includes('deploy,'));
	t.true(result.includes('good luck!'));
});
