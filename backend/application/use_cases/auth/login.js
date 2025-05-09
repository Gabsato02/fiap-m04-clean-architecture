const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (userRepository, jwtUtils) => {
	return async function loginUser(email, password) {
		const { email: $e } = sanitizationUtils.sanitizeInput({ email });

		const user = await userRepository.findByEmail($e);

		if (!user || user.password !== password) {
			throw new Error('Credenciais inválidas');
		}
		const { username, email: $email, id } = user;

		const token = jwtUtils.generateToken({ username, email: $email, id });

		const { password: _, ...userInfo } = user;

		return { user: userInfo, token };
	};
};
