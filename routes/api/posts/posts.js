'use strict'

let currentId = 2
const posts = [
  {
    id: 1,
    user: 'John Doe',
    title: 'Hello World',
  },
]

const postOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['user', 'title'],
      properties: {
        title: { type: 'string' },
        user: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          user: { type: 'string' },
        },
      },
    },
  },
}

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  const createError = fastify.httpErrors.createError
  // Read
  fastify.get('/', async function (request, reply) {
    reply.status(200).send(posts)
  })

  // Create
  fastify.post('/', postOptions, async function (request, reply) {
    const { title, user } = request.body

    const newPost = { id: currentId, title, user }

    posts.push(newPost)

    currentId++

    reply.code(201)
    return newPost
  })

  // Read
  fastify.get('/:id', async function (request, reply) {
    try {
      const post = posts.find((p) => p.id === +request.params.id)

      if (!post) {
        return createError(404, 'This post does not exist!')
      }

      post.support = fastify.someSupport()

      return post
    } catch (err) {
      throw new Error('Something went wrong')
    }
  })
}
