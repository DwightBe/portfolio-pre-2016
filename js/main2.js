
$(function(){

	$(".sq-button").click(function ()
	{
		var id=$(this).attr('id');

		$(".sq-button h1").fadeOut();
		$(".sq-bg").fadeOut();

		$("#projects-button").removeClass("black");
		$("#projects-button").addClass("blue opacity-3");


		$("#illustration-button").removeClass("black");
		$("#illustration-button").addClass("pink opacity-2");

		$("#art-button").removeClass("black");
		$("#art-button").addClass("turquoise opacity-3");

		$("#links-button").removeClass("black");
		$("#links-button").addClass("purple opacity-3");

		$(".square-viewer").animate({
		    height:"50px",
		    width:"50px",
		  }, 500, function() {
		  	
		});

		$("#buttons-container").animate({
		    width:"50px",
		  }, 500, function() {
		  	
		});

		if(id==="projects-button")
		{
			$(".content-container").fadeOut();
			$("#projects-container").fadeIn();
			$(".highlight").removeClass("pink purple turquoise");
			$(".highlight").addClass("blue opacity-1");
		}
		if(id==="illustration-button")
		{
			$(".content-container").fadeOut();
			$("#illustration-container").fadeIn();
			$(".highlight").removeClass("blue purple turquoise");
			$(".highlight").addClass("pink opacity-1");
		}
		if(id==="art-button")
		{
			$(".content-container").fadeOut();
			$("#art-container").fadeIn();
			$(".highlight").removeClass("blue purple pink");
			$(".highlight").addClass("turquoise opacity-1");
		}
		if(id==="links-button")
		{
			$(".content-container").fadeOut();
			$("#links-container").fadeIn();
			$(".highlight").removeClass("turquoise purple pink");
			$(".highlight").addClass("purple opacity-1");
		}


	});

    $('div.superSliderBox').superSlider();

	
});

   $(document).ready(function(){
                

            });