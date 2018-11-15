var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.251',1883)

client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
      client.publish('init_master', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})
