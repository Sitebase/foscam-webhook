// const express = require('express');
const mqtt = require('mqtt');
const http = require('http');
const SMTPServer = require('smtp-server').SMTPServer;

const webhookEndpoint = process.env.webhook || null;

const mqttServer = process.env.MQTT_SERVER || '192.168.1.116';
const mqttClient  = mqtt.connect('mqtt://' + mqttServer);

/************************************************************
 * REST API
 ***********************************************************/
// const app = express();
// app.set('port', ()
// app.get('/', function(request, response) {
    // response.status(200).send({
        // name: info.name,
        // version: info.version
    // });
// });
// app.listen(app.get('port'), function() {
    // console.log('Foscam webhook running on port ' + app.get('port'));
// });

/************************************************************
 * SMTP Listener
 ***********************************************************/
var server = new SMTPServer({
    authOptional: true,
    // logger: true,
    onConnect: function(session, callback){
        const cameraName = session.clientHostname.slice(0, -4);
        console.log('event', cameraName);

        // MQTT publish event
        mqttClient.publish('home/camera/' + cameraName, cameraName);

        // HTTP webhook
        if(process.env.webhook) {
            http.get(process.env.webhook.replace('{name}', cameraName));
        }

        return callback();
    }
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log('SMTP server running on port', port);
