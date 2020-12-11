const { sonicChannelSearch } = require('./search')
const { sonicChannelIngest } = require('./ingest')
const level = require('level')
const db = level('/var/lib/data/level')
const uniqid = require('uniqid')

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
fastify.addHook('onClose', (instance, done) => {
  sonicChannelSearch.close()
  sonicChannelIngest.close()
  done()
})

const authenticate = (req, res) => {
  const key = process.env.API_KEY || 'secret'
  if (req.headers.authorization !== `Simple ${key}`) {
    res.code(401).send({
      error: 'Unauthorized'
    })
    return false
  }

  return true
}

fastify.get('/health', function(req, res) {
  res.status(200).send('Server Running')
})

fastify.post('/search', async function(req, res) {
  if (!authenticate(req, res)) {
    return
  }
  const body = req.body
  const {
    collection,
    bucket,
    text
  } = body

  try {
    const key = `${collection}:${bucket}:${uniqid()}`
    await Promise.all([
      sonicChannelIngest.push(collection, bucket, key, text),
      db.put(key, text)
    ])
    res.send('ok')
  } catch (e) {
    console.error(e)
    res.send({
      error: e
    })
  }
})

fastify.get('/search/:collection/:bucket', async function(req, res) {
  if (!authenticate(req, res)) {
    return
  }
  const {
    collection,
    bucket
  } = req.params
  const q = req.query.q

  try {
    const result = await sonicChannelSearch.query(collection, bucket, q)
    const values = await Promise.all((result || []).map(async (id) => {
      try {
        const value = await db.get(id)
        return {
          id,
          value
        }
      } catch (e) {
        return {
          id,
          error: `not found`
        }
      }
    }))
    res.send(values)
  } catch (e) {
    console.error(e)
    res.send({
      error: e
    })
  }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
