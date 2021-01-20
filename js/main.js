var contentDiv = document.getElementById("content");
var pageDiv = document.getElementById("page");
var coverDiv = document.getElementById("cover");
var lengthDiv= document.getElementById("layer-horizontal-3");

var canFinishShiftUpHorizontalLayersAfterEverythingLoaded = true;

var layerHorizontalArray = new Array();
var panelArray = new Array();

var layerHorizontalSpeedArray = new Array();

var layersMovement;

var pageVerticalPosition = 0;
var pageVerticalPositionOnTouch = 0;
var previousPageVerticalPosition = 0;
var deltaPageVerticalPosition = 0;

var canScrollOrSwipe;
disableScrollOrSwipe();

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

window.onload = function()
{

	storeDivs();

	showContainer(); //set class not transparent
	
	shiftUpHorizontalLayersAfterEverythingLoaded();

	setPageHeight();

	setPanelWidth();

	setLayerSpeed();



}


window.onscroll = function (e)
{
	if (canScrollOrSwipe == true) //to avoid user swipe when window is still resizing after screen orientation changed on table
	{

		detectPageVerticalPosition();
		runTheseFunctionsAfterScrollOrSwipe();
	}


}


window.onresize = function (e)
{	

//when the window resizes, get total page height without container
setPageHeight();

setPanelWidth();

//returns page vertical position and change in page vertical position from previous resize
detectPageVerticalPosition();

//returns each div's speed (size of div/total horizontal or vertical)
setLayerSpeed();

moveLayers();

enableScrollOrSwipe();

}

function showContainer()
{
	containerDiv.setAttribute("class", "");
}

function shiftUpHorizontalLayersAfterEverythingLoaded()
{
	//for each horizontal layer
	//animate to the top 0 px within 1000 sec than go to finish
	for (var i=0; i<layerHorizontalArray.length; i++)
	{
		$(layerHorizontalArray[i]).stop().animate({top: "0px"}, 1000, function() {finishShiftUpHorizontalLayersAfterEverythingLoaded()});
	}
}

function finishShiftUpHorizontalLayersAfterEverythingLoaded()
{
	if (canFinishShiftUpHorizontalLayersAfterEverythingLoaded == true)
	{
		canFinishShiftUpHorizontalLayersAfterEverythingLoaded = false;
		isPreloadShiftUpAnimationFinish = true;
		
		makePageScrollable();
		
	}
}

function enableScrollOrSwipe()
{
	canScrollOrSwipe = true;

	
}

function disableScrollOrSwipe()
{
	canScrollOrSwipe = false;
}


function runTheseFunctionsAfterScrollOrSwipe()
{

	moveLayers();
	//shiftUpDownHorizontalLayers();
	//deviceFunctionScrollSwipe();
	

}

function shiftUpHorizontalLayersAfterEverythingLoaded()
{
	//for each horizontal layer
	//animate to the top 0 px within 1000 sec than go to finish
	for (var i=0; i<layerHorizontalArray.length; i++)
	{
		$(layerHorizontalArray[i]).stop().animate({top: "0px"}, 1000, function() {finishShiftUpHorizontalLayersAfterEverythingLoaded()});
	}
}

function finishShiftUpHorizontalLayersAfterEverythingLoaded()
{
	if (canFinishShiftUpHorizontalLayersAfterEverythingLoaded == true)
	{
		canFinishShiftUpHorizontalLayersAfterEverythingLoaded = false;
		
		makePageScrollable();
		//animateScrollOrSwipeTextContainer();

		clickEvents();
	}
}

function makePageScrollable()
{
	contentDiv.setAttribute("class", "");
	enableScrollOrSwipe();
}


function setPageHeight()
{
	
	pageDiv.style.height = layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth + "px";

}

function clickEvents()
{

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
}

function setPanelWidth()
{
	

	coverDiv.style.width = containerDiv.offsetWidth+"px";

	for (var i=0; i<layerHorizontalArray.length; i++)
	{
		panelArray[i].style.width = containerDiv.offsetWidth+"px";
		if(i!=0)
		{
		panelArray[i].style.left = ((containerDiv.offsetWidth+200)*(i))+"px";
		}

	}

	lengthDiv.style.width = containerDiv.offsetHeight+(2*containerDiv.offsetWidth)+200+"px";
	pageDiv.style.height = containerDiv.offsetHeight+(2*containerDiv.offsetWidth)+200+"px";

}

function setLayerSpeed()
{
	//empty array first
	while (layerHorizontalSpeedArray.length > 0)
	{
    	layerHorizontalSpeedArray.pop();
  	}
	

	for (var i=0; i<layerHorizontalArray.length; i++)
	{
	
		var layerHorizontalSpeed = (layerHorizontalArray[i].offsetWidth - containerDiv.offsetWidth) / (layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth);
		layerHorizontalSpeedArray.push(layerHorizontalSpeed);
	}

}


function detectPageVerticalPosition()
{
	previousPageVerticalPosition = pageVerticalPosition;
	/*
	if (deviceName == "computer")
	{	
		if (browserName == "internet explorer")
		{
			pageVerticalPosition = document.documentElement.scrollTop;
		}
		else
		{*/
			pageVerticalPosition = pageYOffset;
			
		
		/*}
	}
	else //mobile
	{
		pageVerticalPosition = pageVerticalPositionOnTouch + (touchStartX - touchCurrentX);
	
		if (pageVerticalPosition < 0)
		{
			pageVerticalPosition = 0;
		}
		if (pageVerticalPosition > pageDiv.offsetHeight - containerDiv.offsetHeight)
		{
			pageVerticalPosition = pageDiv.offsetHeight - containerDiv.offsetHeight;
		}
	}
	*/
	//what is page Y offset?
	//change in vertical position
	deltaPageVerticalPosition = pageVerticalPosition - previousPageVerticalPosition;
	
}

function moveLayers()
{
	setLayersMovement();

	//layerHorizontalSpeedArray 
	//(layerHorizontalArray[i].offsetWidth - containerDiv.offsetWidth) / (layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth)

	if (layersMovement == "horizontal")
	{
		if(panelArray[0].style.top != "0px")
			{
			panelArray[0].style.top = "0px";
			coverDiv.style.top = "-100%"
			}
		//move layer horizontal
		for (var i=0; i<layerHorizontalArray.length; i++)
		{
			//for each layer horizontal div
			//layer horizontal div left = layer horizontal speed * scroll distance px
			layerHorizontalArray[i].style.left = (-1 * layerHorizontalSpeedArray[i] * (pageVerticalPosition-(containerDiv.offsetHeight))) + "px";

		}
		
		positionLayerHorizontalToBottom();
		
		positionVerticalLayersHorizontally(); //move vertical layers to follow horizontal layer movement
	}
	
	if (layersMovement == "vertical")
	{
		//shift layer vertical position
		for (var i=0; i<layerVerticalArray.length; i++)
		{
			//move layer from the bottom
			//vertical speed * 
			//scroll position - (final horizontal array offset - container)
			layerVerticalArray[i].style.bottom = (-1 * layerVerticalSpeedArray[i] * (pageVerticalPosition - (layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth))) + "px";
		}
		
		//positionVerticalLayersAtLeftMost(); //make layer vertical position has same left position
		//positionHorizontalLayersToHaveSameRightPosition(); //make layer horizontal position has same right position
		//positionHorizontalLayersVertically();
		//make robby stand still when he is inside balloon
		
	}
	if (layersMovement == "vertical 1")
	{
			for (var i=0; i<layerHorizontalArray.length; i++)
				{
					layerHorizontalArray[i].style.left = "0px";
				}
			console.log(panelArray[0].style.top);
			panelArray[0].style.top = (-1  * (pageVerticalPosition-(containerDiv.offsetHeight))) + "px";
			coverDiv.style.top = (-1* (pageVerticalPosition-(containerDiv.offsetHeight)))-containerDiv.offsetHeight+ "px";


	}
	
	if (layersMovement == "not moving 2")
	{

	}
	
}

function positionLayerHorizontalToBottom()
{

		//make sure horizontal layers have same vertical position after they are moved vertically
		//for each horizontal array div make it equal 0px from the top;
		for (var i=0; i<layerHorizontalArray.length; i++)
		{
			layerHorizontalArray[i].style.top = "0px";
		}
			
}


function setLayersMovement()
{
	
	if(pageVerticalPosition < ((containerDiv.offsetHeight)))
	{
		layersMovement = "vertical 1";
	}
	else if (pageVerticalPosition * layerHorizontalSpeedArray[layerHorizontalSpeedArray.length-1] <= layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth)
	{
		layersMovement = "horizontal";
	}
	
}

function storeDivs()
{
	var divArray = document.getElementsByTagName("div");
	
    for (var i=0; i<divArray.length; i++)
	{
	
		if (divArray[i].getAttribute("class") == "layer-horizontal")
		{	
			layerHorizontalArray.push(divArray[i]);
		}
		if (divArray[i].getAttribute("class") == "panel")
		{
			panelArray.push(divArray[i]);
		}
	
    }
}

