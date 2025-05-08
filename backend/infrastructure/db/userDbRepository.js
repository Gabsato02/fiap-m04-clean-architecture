const db = require('./dbService');
const UserRepository = require('../../domain/repositories/userRepository');

class UserDbRepository extends UserRepository {
	async create(user) {
		const _db = db.readDB();

		const newUser = { id: Date.now(), ...user, balance: 0, history: [0] };
		
		_db.users.push(newUser);

		db.writeDB(_db);

		return newUser;
	}

	async findByEmail(email) {
		const _db = db.readDB();
		return _db.users.find((u) => u.email === email);
	}
}

module.exports = new UserDbRepository();
