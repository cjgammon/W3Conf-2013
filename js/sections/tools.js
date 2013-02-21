/*global define*/
define([], function (require) {
	var UserEvent = require('events/UserEvent'),
		TOOLS,
		TOOL_BASE_URL = "content/tools/";
		
	TOOLS = function () {
		var instance = this,
			$container = $('#tools'),
			$iframe = $('#tools iframe'),
			$buttons = $container.find('li');
		
		function handle_button_CLICK(e) {
			var $this = $(this);
			$buttons.removeClass('active');
			$this.addClass('active');
			$iframe.attr('src', TOOL_BASE_URL + $this.data('content') + '/index.html');
		}
		
		instance.init = function () {
			$buttons.bind('click', handle_button_CLICK);
		}
		
		instance.init();
	}
	
	return TOOLS;
});