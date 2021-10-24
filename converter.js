#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const fs = require('fs');
const { parse } = require('csv/lib/sync');
const { stringify } = require('yaml')

console.log('INPUT:', argv.i, '| OUTPUT:', argv.o);
const records = parse(fs.readFileSync(argv.i), {
	columns: true,
	skip_empty_lines: true
});

console.log(records);
const items = records.reduce((acc, record) => ({
	...acc,
	[record['ID']]: {
		type: 'item',
		item: {
			material: record['NAME'],
			quantity: 1,
		},
		buyPrice: record['BUY PRICE'],
		sellPrice: record['SELL PRICE'],
		slot: record['SLOT'],
		page: record['PAGE']
	}
}), {});

fs.writeFileSync(argv.o, stringify({
	blocks: {
		name: "&2Blocks &f(&8Page: &6%page%&f)",
		fillItem: {
			material: '',
			name: '',
		},
		items
	}
}))