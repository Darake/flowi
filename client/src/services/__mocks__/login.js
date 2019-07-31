const users = [
  {
    email: 'admin@example.com',
    password: 'admin'
  }
];

const login = credentials => {
  const user = users.find(u => u.email === credentials.email);
  if (user && user.password === credentials.password) {
    return 'token';
  }
  return null;
};

export default { login };
