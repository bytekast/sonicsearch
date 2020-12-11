const SonicChannelIngest = require('sonic-channel').Ingest
const sonicChannelIngest = new SonicChannelIngest({
  host: '0.0.0.0',
  port: 1491
}).connect({
  connected: () => console.info('Sonic Channel succeeded to connect to host (ingest).'),
  disconnected: () => console.error('Sonic Channel is now disconnected (ingest).'),
  timeout: () => console.error('Sonic Channel connection timed out (ingest).'),
  retrying: () => console.error('Trying to reconnect to Sonic Channel (ingest)...'),
  error: error => console.error('Sonic Channel failed to connect to host (ingest).', error)
})

module.exports = {
  sonicChannelIngest
}
