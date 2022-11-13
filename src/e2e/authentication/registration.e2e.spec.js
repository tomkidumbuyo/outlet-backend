import * as utils from '../utils';

describe('User Registration', () => {
	it('user registration should work', async () => {
		const user = utils.userRegistration({
			email: 'mryougntommy@gmail.com',
			password: '1123581321aA.',
			verifyPassword: '1123581321aA.',
		});
		console.log('user: ', user);
	});
});
