"use strict";


const NodeHelper = require('node_helper');
const Log = require("../../js/logger");
const url = require("url");
const path = require('path');

module.exports = NodeHelper.create({
		//hacktoberfest stuff.
	socketNotificationReceived: function(notification, payload){
		/*Sends the payload back to broadcast to clients*/
		if(notification === 'test'){
			this.sendSocketNotification('test', 'This is coming from the server.');
		}

	},

	start: function(){
		Log.log('Started ' + this.name + ' Helper');
		/*Allow to navigate to the form to submit a message*/
		this.expressApp.get('/setNote', function(req, res){
			res.sendFile(path.join(__dirname + '/public/index.html'));
		});

		/*Receive the message via POST form submit*/
		this.expressApp.get('/getNote', (req, res) => {
			let query = url.parse(req.url, true).query;
			let message = query.note;
			this.sendSocketNotification('Message', message);
			res.send({"status": "success", "payload": message});
		})
	},

	stop: function(){
		Log.log('Shutting down ' + this.name)
	},


});


