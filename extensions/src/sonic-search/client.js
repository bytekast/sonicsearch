const fetch = require('node-fetch')

const apiKey = process.env.SONIC_API_KEY
const collection = process.env.SONIC_COLLECTION || 'default'
const bucket = process.env.SONIC_BUCKET || 'default'

const send = (event) => {
  const body = {
    collection: collection,
    bucket: bucket,
    text: JSON.stringify(event)
  }
  fetch(`https://sonic-level.onrender.com/search`, {
    method: 'post',
    headers: {
      'Authorization': `Simple ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .catch(err => console.error(err))
}

module.exports = {
  send
}
