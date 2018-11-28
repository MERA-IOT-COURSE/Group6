const Gpio = require('onoff').Gpio;
const led = new Gpio(27, 'out');
const buzzer = new Gpio(22, 'out'); 
const button = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
 
button.watch((err, value) => {
  if (err) {
    throw err;
  }
  setTimeout(() => 
{
        buzzer.writeSync("1");
  led.writeSync("1");

}, 5000);
  buzzer.writeSync(buzzer.readSync() ^ 1);
  led.writeSync(led.readSync() ^ 1);
});
 
process.on('SIGINT', () => {
  led.unexport();
  buzzer.unexport();
  button.unexport();
});

