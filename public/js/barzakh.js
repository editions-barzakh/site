$(function() {
	$(".content-link").click(function(event) {
		window.location = $(this).find("a").attr("href");
    	return false;
	});
});