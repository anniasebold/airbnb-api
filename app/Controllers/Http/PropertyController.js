'use strict'

const auth = require('@adonisjs/auth');

const Property = use('App/Models/Property')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   */
  async index ({ request }) {
  const { latitude, longitude } = request.all()

  const properties = Property.query()
    .nearBy(latitude, longitude, 10)
    .fetch()

  return properties
}

  /**
   * Create/save a new property.
   * POST properties
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show ({ params }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   */
  async destroy ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  }
}

module.exports = PropertyController
