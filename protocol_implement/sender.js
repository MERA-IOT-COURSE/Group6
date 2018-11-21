var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://10.42.0.10',1883); //10.42.0.10 //192.168.1.63
var HWID = '0000000088013898';
var NAME = 'group6';

client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
      client.subscribe('dev_' + HWID);
      var registerMsgJSON =
      {
        mid: 'REGISTER',
        data: []
      };

      var registerJSON =
      {
        version: '1.0',
        hw_id: HWID,
        name: NAME,
        sensors: [],
        actions: []
      };

      registerMsgJSON.data = registerJSON;

      var registerString = JSON.stringify(registerMsgJSON);
      //var {}
      client.publish('init_master', registerString)
    }
  })
})


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  if(topic == 'dev_' + HWID)
  {
    var registerRespMsgJSON = JSON.parse(message.toString());
    var status = registerRespMsgJSON.data.status;
    console.log(status);
  }
})
