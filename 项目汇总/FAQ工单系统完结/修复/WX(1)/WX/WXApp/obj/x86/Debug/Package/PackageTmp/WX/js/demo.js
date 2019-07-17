$(document).ready(function() {
	$(".item>h3").each(function() {
		$(this).click(function() {
			var e = $(this).parent();
			$(e).find("ul.list").toggle();
		})
	});
}); 
