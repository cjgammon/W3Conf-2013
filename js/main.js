require.config({
  shim: {
	
  },

  paths: {
    jquery: 'vendor/jquery-1.9.0.min',
    signals: 'vendor/signals.min',
    history: 'vendor/jquery.history',
    balance: 'vendor/jquery.balancetext',
    lettering: 'vendor/jquery.lettering',
    kerning: 'vendor/kerning',
    hyphenator: 'vendor/hyphenate',
	raf: 'vendor/RequestAnimationFrame',
	gs: 'vendor/greensock/TweenMax.min'
  }
});
 
require([
	'signals', 
	'history', 
	'lettering', 
	'kerning',
	'balance', 
	'hyphenator', 
	'gs', 
	'raf', 
	'app'], function() {
    
});
