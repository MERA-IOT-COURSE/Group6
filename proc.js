var proc = require("child_process")
proc.spawn
proc.exec("ps -eo pid,cmd", (err, stdout, stderr)=>{
	console.log(stdout)
})
