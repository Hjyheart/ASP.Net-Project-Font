/**
 * Created by hongjiayong on 2017/6/14.
 */
var os = require('os')
var ip = function () {
  console.log('get system ip')
}

ip.prototype.address = function () {
  var network = os.networkInterfaces()
  for (var i=0; i < network.en1.length; i++){
    var json = network.en1[i]
    if (json.family === 'IPv4'){
      console.log(json.address)
    }
  }
}
