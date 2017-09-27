const expect = require ('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: 'Rosie',
			room: 'Mein Zimmer'
		}, {
			id: 2,
			name: 'Maggy',
			room: 'Mein Zimmer'
		}, {
			id: 3,
			name: 'Dennis',
			room: 'Mein Zimmer'
		}, {
			id: 4,
			name: 'David',
			room: 'Kifferbude'
		}, {
			id: 5,
			name: 'Donny',
			room: 'Kifferbude'
		}]
	})

	it('should create a new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Dennis',
			room: 'Mein Zimmer'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);

	});

	it('should return an array with the user names', () => {
		var userList = users.getUserList('Kifferbude');
		expect(userList).toEqual(['David', 'Donny']);
	});

	it('should return an array with the user names from the Mein Zimmer', () => {
		var userList = users.getUserList('Mein Zimmer');
		expect(userList).toEqual(['Rosie', 'Maggy', 'Dennis']);
	});

	it('should remove a user from the list', () => {
		var userId = 2;
		var removedUser = users.removeUser(userId);

		expect(users.users.length).toBe(4);
		expect(removedUser.id).toBe(userId);
	});

	it('should not remove an unknown user', () => {
		var userId = 99;
		var removedUser = users.removeUser(userId);

		expect(removedUser).toNotExist();

	});

	it('should find a user', () => {
		var retUser = users.getUser(1);
		expect(retUser.name).toBe('Rosie');
	});

	it('shoudl not find a user we do not have', () => {
		var userId = '99';
		var user = users.getUser(userId);

		expect(user).toNotExist;
	});
});