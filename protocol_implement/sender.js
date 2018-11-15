var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.251',1883) //10.42.0.10

client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
      var hwid = "testdev";
      client.subscribe("dev_" + hwid);
      var registerMsgJSON =
      {
        mid: "",
        data: []
      };

      var registerJSON =
      {
        version: "1.0",
        hw_id: hwid,
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
  if(topic == 'dev_testdev')
  {
    var registerRespMsgJSON = JSON.parse(message.toString());
    var status = registerRespMsgJSON.data.status;
    console.log(status);
  }
})
