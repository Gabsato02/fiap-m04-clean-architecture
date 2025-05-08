module.exports = (userRepository, jwtUtils) => {
	return async function loginUser(email, password) {
		const user = await userRepository.findByEmail(email);

		if (!user || user.password !== password) {
			throw new Error('Credenciais inválidas');
		}
		const { username, email: $email, id } = user;

		const token = jwtUtils.generateToken({ username, email: $email, id });

		const { password: _, ...userInfo } = user;

		return { user: userInfo, token };
	};
};
