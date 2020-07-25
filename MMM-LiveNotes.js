

Module.register('MMM-LiveNotes', {
	message: '',

	defaults:{
		title: 'Current Notes'
	},

	start: function(){
		Log.log(this.name + ' Is loaded!');
		//send a socket notification to connect
		this.sendSocketNotification("CONNECT");
	},

	getDom: function(){
		/*Create our div*/
		let wrapper = document.createElement('div');

		/*Create the title if set*/
		if(this.config.title){
			let title = document.createElement('header');
			title.innerHTML = this.config.title || this.name;
			wrapper.appendChild(title);
		}

		let message = document.createElement('p');
		message.innerHTML = this.message;
		wrapper.appendChild(message);
		return wrapper;
	},

	/*When the client receives a socket from server*/
	socketNotificationReceived: function(notification, payload){
		if(notification === 'Message'){
			/*Set the message to the payload and update dom*/
			this.message = payload;
			this.updateDom();
		}
	},


});