'use strict'

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    throw new Error('Some Error')
    reply.code(200).send({ posts: [] })
  })
}
