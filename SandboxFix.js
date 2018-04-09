/**
* SandboxFix
* Plugin podmieniający URL-e w sandbox Allegro linkujące do serwisu produkcyjnego.
* RTNET
*/

$.noConflict();
var __prodAllegroUrl = '//allegro.pl/';
var __sandboxAllegroUrl = '//allegro.pl.allegrosandbox.pl/';
var __observer;

jQuery(document).ready(function($) {
	FixSandboxUrls($, $('body'));
	if ("MutationObserver" in window) {
		var observer = new MutationObserver(function(mutations) {
			observer.disconnect();
			FixSandboxUrls($, $('body'));
			observer.observe(target,  { attributes: true, childList: true, characterData: true });
		});
		var target = $('body').get(0);
		observer.observe(target,  { attributes: true, childList: true, characterData: true });
	}
});


function FixSandboxUrls($, $o) {
	var $links = $o.find('a[href*="' + __prodAllegroUrl + '"]');
	var count = 0;
	$links.each(function() {
		var href = $(this).attr('href');
		href = href.replace(__prodAllegroUrl, __sandboxAllegroUrl);
		 $(this).attr('href', href);
		count ++;
	});
	
	if(console && count > 0) {
		console.info('[SandboxFix] Replaced urls: ' + count);
	}
}
