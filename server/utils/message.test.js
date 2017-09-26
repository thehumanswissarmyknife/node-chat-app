var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var varFrom = 'Dennis';
		var varText = 'blahblahblah';

		var result = generateMessage(varFrom, varText);

		expect(result.from).toBe(varFrom);
		expect(result.text).toBe(varText);
		// expect(result.createdAt).toBeA('number');

	});
});