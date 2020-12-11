const SonicChannelSearch = require('sonic-channel').Search
const sonicChannelSearch = new SonicChannelSearch({
  host: '0.0.0.0',
  port: 1491
}).connect({
  connected: () => console.info('Sonic Channel succeeded to connect to host (search).'),
  disconnected: () => console.error('Sonic Channel is now disconnected (search).'),
  timeout: () => console.error('Sonic Channel connection timed out (search).'),
  retrying: () => console.error('Trying to reconnect to Sonic Channel (search)...'),
  error: error => console.error('Sonic Channel failed to connect to host (search).', error)
})

module.exports = {
  sonicChannelSearch
}
