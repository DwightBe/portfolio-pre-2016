(function($){
    $.fn.extend({ 

        superSlider: function(options) {
 
            var defaults = {
                animSpedd: 750,
                isMoving: false
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() {
                var o = options;
                
                //elements var definition
                var $el = $(this).find('div.superSliderSlider');              
                var $e = $el.find('div.superSliderSlide');
                var $next = $(this).find('div.superSliderArrowNext a');
                var $prev = $(this).find('div.superSliderArrowPrev a');
                var $boxButton = $(this).find('div.superSliderButton');
                var n = $e.length;
                var w = parseInt($e.width(), 10);
                var left = 0;
                var boxButtonWidth = 0;
                var currentSlidePosition = 0;
                var css = '';
                $el.width(n*w);
                if (n > 1) {
                    for (i = currentSlidePosition; i < n; i++) {
                    	if (i == currentSlidePosition) {
                    		$boxButton.append('<a href="#goToSlide_' + i + '" class="current"><span>goToSlide_' + i + '</span></a>');
                    	} else {
                    		$boxButton.append('<a href="#goToSlide_' + i + '"><span>goToSlide_' + i + '</span></a>');
                    	}
                    	boxButtonWidth += 14;
                    }
                    $boxButton.css({marginLeft: -boxButtonWidth/2 + 'px', width: boxButtonWidth});
                    $prev.css({'display':'none'});
                } else {
                    $boxButton.css({'display':'none'});
                    $next.css({'display':'none'});
                    $prev.css({'display':'none'});
                }

                //next click
                $next.on('click tap', function(){
                	if (!o.isMoving) {
                		o.isMoving = true;
                		moveSliderNext();
                	}
                	return false;
                });


                //prev click
                $prev.on('click tap', function(){
                	if (!o.isMoving) {
                		o.isMoving = true;
                		moveSliderPrev();
                	}
                	return false;
                });


                //button click
                $boxButton.find('a').on('click tap', function(){
                	if (!o.isMoving) {
                		o.isMoving = true;
                        previousSlidePostion = parseInt($el.parent().parent().parent().find('a.current').attr('href').replace('#goToSlide_', ''), 10);
                		$boxButton.find('a').removeClass('current');
                		$(this).addClass('current');
                		currentSlidePosition = parseInt($(this).attr('href').replace('#goToSlide_', ''), 10);
                        movementDirection = (currentSlidePosition > previousSlidePostion) ? 'next' : 'prev';
                        checkPositionToEnableArrows((currentSlidePosition - 1), movementDirection);
                		moveSliderTo(currentSlidePosition);
                	}
                	return false;
                });


                //utility function
                function moveSliderNext () {
                	left = parseInt($el.css('left'), 10);
                	if (left > ((n*w - w) * (-1))) {
                        checkPositionToEnableArrows(currentSlidePosition, 'next');
                        currentSlidePosition++;
                        $boxButton.find('a').removeClass('current');
                        $boxButton.find('a').eq(currentSlidePosition).addClass('current');
                		left -= w;
                		css = {left: left + 'px'};
                		$el.animate(css, o.animSpedd, function(){
                			o.isMoving = false;
                		});
                	} else {
                		o.isMoving = false;
                	}
                }

                function moveSliderPrev () {
                	left = parseInt($el.css('left'), 10);
                	if (left < 0) {
                        checkPositionToEnableArrows(currentSlidePosition, 'prev');
                        currentSlidePosition--;
                        $boxButton.find('a').removeClass('current');
                        $boxButton.find('a').eq(currentSlidePosition).addClass('current');
                		left += w;
                		css = {left: left + 'px'};
                		$el.animate(css, o.animSpedd, function(){
                			o.isMoving = false;
                		});
                	} else {
                		o.isMoving = false;
                	}
                }

                function moveSliderTo (currentSlidePosition) {
                	left = w * currentSlidePosition;
                	css = {left: -left + 'px'};
                	$el.animate(css, o.animSpedd, function(){
            			o.isMoving = false;
            		});
                }

                function checkPositionToEnableArrows (currentSlidePosition, movementDirection) {
                    if (movementDirection == 'next') {
                        if (currentSlidePosition + 2 >= n) {
                            $next.fadeOut();
                            $prev.fadeIn();
                        } else if (currentSlidePosition + 1 > 0) {
                            $prev.fadeIn();
                            $next.fadeIn();
                        }
                         else {
                            $next.fadeIn();
                            $prev.fadeOut();
                        }
                    } else {
                        if (currentSlidePosition + 1 == n) {
                            $next.fadeIn();
                            $prev.fadeIn();
                        } else if (currentSlidePosition - 1 < -1) {
                            $prev.fadeOut();
                            $next.fadeIn();
                        }
                         else {
                            $next.fadeIn();
                            $prev.fadeIn();
                        }
                    }
                }
                 
            });
        }
    });
})(jQuery);