# Foscam Webhook
Solve the absence of webhook functionality in Foscam IP cameras.
What all the Foscam's do support is sending out emails via an SMTP server when an event happens.
This little node server will create a fake SMTP server that we will use in our Foscam.
When an event happens the Foscam will connect to our fake SMTP server and we will now that an event has happened.


