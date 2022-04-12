'use strict'

const User = use('App/Models/User')

class UserController {
  async create ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    if (!data.username || !data.email || !data.password) {
      return response.status(400).json({ error: 'Some fields is not informed' })
    }

    const user = await User.create(data)

    return user;
  }
}

module.exports = UserController
