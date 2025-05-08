module.exports = (userRepository, jwtUtils) => {
  return async function createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) throw new Error('User already exists');

    const newUser = await userRepository.create(userData);

    const token = jwtUtils.generateToken({ email: newUser.email });
  
    return { user: newUser, token };
  };
};
