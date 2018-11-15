var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.251',1883) //10.42.0.10

client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
      var registerMsgJSON =
      {
        mid: "",
        data: []
      }

      var registerJSON =
      {
        version: "1.0",
        hw_id: "testdev",
        sensors: [],
        actions: []
      };

      registerMsgJSON.data = registerJSON;

      var registerString = JSON.stringify(registerMsgJSON);;
      //var {}
      client.publish('init_master', registerString)
    }
  })
})
