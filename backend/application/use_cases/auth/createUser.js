const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (userRepository, jwtUtils) => {
  return async function createUser(userData) {
    const $userData = sanitizationUtils.sanitizeInput(userData);

    const existingUser = await userRepository.findByEmail($userData.email);

    if (existingUser) throw new Error('Usuário já existe.');

    const newUser = await userRepository.create($userData);

    const token = jwtUtils.generateToken({ email: newUser.email });
  
    return { user: newUser, token };
  };
};
