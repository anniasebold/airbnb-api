'use strict'

const User = use('App/Models/User')

class UserController {
  async create ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    if(!data.username) {
      return response.status(400).json({ error: 'Username is not informed' })
    }

    if(!data.email) {
      return response.status(400).json({ error: 'Email is not informed' })
    }

    if(!data.password) {
      return response.status(400).json({ error: 'Password is not informed' })
    }

    const user = await User.create(data)

    return user;
  }
}

module.exports = UserController
