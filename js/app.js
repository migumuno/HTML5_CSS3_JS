$( document ).ready(function() {
	$( '.filtro-timeline__formacion' ).click(function(){
		$( 'article.formacion' ).slideToggle('slow');
		$( '.filtro-timeline__formacion' ).toggleClass('active');
	});

	$( '.filtro-timeline__experiencia' ).click(function(){
		$( 'article.experiencia' ).slideToggle('slow');
		$( '.filtro-timeline__experiencia' ).toggleClass('active');
	});

	/* Smooth menú */
	$("a[href^='#']").click( function() {
		var href = $( this ).attr('href');
		$( 'html, body' ).animate({
			scrollTop: $( href ).offset().top
		}, 2000);
	});
});