const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (userRepository) => {
	return async function getUserByEmail(email) {
		const { email: $email } = sanitizationUtils.sanitizeInput({ email });
		return await userRepository.findByEmail($email);
	};
};
