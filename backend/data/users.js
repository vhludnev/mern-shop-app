import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Smith',
    email: 'jane@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
