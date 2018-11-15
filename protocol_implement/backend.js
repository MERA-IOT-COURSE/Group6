var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.251',1883)

client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  if(topic == 'init_master')
  {
      var registerReqMsgJSON = JSON.parse(message.toString());
      var hwid = registerReqMsgJSON.data.hw_id;
      var deviceTopicName = "dev_" + hwid;
      client.subscribe("be_" + hwid)
      var registerRespMsgJSON =
        {
          mid: "",
          data: []
        };
      var registerRespDataJSON =
        {
          status: "OK"
        };
      registerRespMsgJSON.data = registerRespDataJSON;
      var registerRespMsgString = JSON.stringify(registerRespMsgJSON);
      client.publish(deviceTopicName, registerRespMsgString);
  }
})
