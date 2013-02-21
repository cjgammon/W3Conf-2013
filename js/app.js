define([], function(require) {
	var UserEvent = require('events/UserEvent'),
    	InView = require('inview'),
		Tools = require('sections/tools');
    
	var $body,
		$window,
		$document,
		$section,
		animating = false,
		SHIFT,
		position = 0,
		goalTop,
		scrolling = false,
		throttle_SCROLL,
		tools;
	
	function handle_KEYDOWN(e) {
		console.log(e.keyCode);
		
		switch(e.keyCode) {
		case 16: //SHIFT
			SHIFT = true;
			break;
		case 32: //SPACE
		/*
			e.preventDefault();
			if (SHIFT) {
				position -= 1;
			} else {
				position += 1;
			}
			animateToPosition();
		*/
			break;
		case 38: //UP
			e.preventDefault();
			break;
		case 39: //RIGHT
			position += 1;
			animateToPosition();
			break;
		case 40: //DOWN
			e.preventDefault();	
			break;
		case 37: //LEFT
			position -= 1;
			animateToPosition();
			break;
		case 27: //ESC
			$body.focus();
			break;
		case 13:
			animateToPosition();
			break;
		case 91:
			e.preventDefault();
			break;
		}
		
	}
	
	function handle_KEYUP(e) {
		switch(e.keyCode) {
		case 16:
		
			SHIFT = false;
			
			break;
		}
	}
	
	function handle_SCROLL(e) {
		scrolling = true;
	}
	
	/**
	* for parsing ampersands after replaced by balance text
	**/
	function parseAmp(cl) {
		cl.each( function () {
			var $this = $(this),
				text = $this.text();
			if (text.indexOf('&') > -1) {
				text = text.replace('&', '<span class="amp">&amp;</span>');
				$this.html(text);
			}	
		});
	}
	
	/**
	* reset iframes
	**/
	function loadIframe() {
		$sections.each(function () {
			var $this = $(this),
				$iframe = $this.find('iframe');

			if ($this.hasClass('active')) {
				$iframe.attr('src', $iframe.data('src'));
				//$iframe.fadeIn();
			} else {
				//$iframe.hide();
				$iframe.attr('src', 'about:blank');
			}
		});
	}
	
	function animateComplete(){
		animating = false;
	}
	
	function animateToPosition() {
		animating = true;
		goalTop = $($('section')[position]).offset().top;  //if different sized..
		TweenMax.killAll();
		TweenMax.to($body, .5, {scrollTop: goalTop, ease: Quad.easeOut, onComplete: animateComplete});
	}
	
	function updateActivePosition() {
		var $activeSection = $($sections[position]),
			$nextSection,
			$prevSection;
		
		if (position < $sections.length) {
			$nextSection = $($sections[position + 1]);
		}
		
		if (position > 0) {
			$prevSection = $($sections[position - 1])
		}
		
		if (!$activeSection.hasClass('active')){
			$('.in').removeClass('in');
			$sections.removeClass('active');
			$sections.removeClass('primed');
			
			$activeSection.addClass('active');
			$activeSection.addClass('primed');
			
			if ($prevSection){
				$prevSection.addClass('primed');	
			}
			if ($nextSection){
				$nextSection.addClass('primed');	
			}
			
			loadIframe();
		}
	}
	
	function update() {
		if (scrolling) {
			scrolling = false;
			//check section for majority of screen
			//TODO:: instead of window height may need to use before and after section height
			$sections.each(function (i) {
	        	var $this = $(this);
	            if ($body.scrollTop() - $this.offset().top < $window.height() / 2 &&
					$body.scrollTop() - $this.offset().top > ($window.height() / 2) - $window.height()) {
					position = i;
				}
			});
			
			updateActivePosition();
		}

		requestAnimationFrame(update);
	}
		
	function init() {
		$window = $(window);
		$document = $(document);
		$body = $('body');
		$sections = $('section');
				
		InView.init();
		updateActivePosition();
		
		$('.lettering').lettering();
		$('.balance').balanceText();
		parseAmp($('.balance'));
		//Hyphenator.run();			
		
		$document.bind('keydown', handle_KEYDOWN);
		$document.bind('keyup', handle_KEYUP);
		$document.scroll(function (e) {
			UserEvent.SCROLL.dispatch(e);
		});
		$window.resize(function () {
			animateToPosition();
		});
		
		UserEvent.SCROLL.add(handle_SCROLL)
		
		requestAnimationFrame(update);
		setTimeout(handle_SCROLL, 100);
	}

	$(document).ready(init);
});