jQuery.noConflict();

(function($) {

	var $body = $('body');

	var touchM = "ontouchstart" in window;

	$(function(){

		/* Various jQuery plugins initializations */

		if($('.toggle').length > 0) $('.toggle').toggle();
		if($('.tabs').length > 0) $('.tabs').tabs('div.tabsContent');
		if($('.twitterList').length > 0) $('.twitterList').twitter($('.twitterUser').text(),1);

		/* Project video */
		if($('#projectVideo').length > 0) {

			projekktor('#projectVideo', function(){
				
			});

		}

		/* Fullscreen video */
		if($('#fullScreenVideo').length > 0) {

	   		projekktor('#fullScreenVideo', {
	   			autoplay: (touchM ? false : true),
	   			playerFlashMP4: $.base64.decode(window.d280sw) + '/js/jarisplayer.swf',
	   			playerFlashMP3: $.base64.decode(window.d280sw) + '/js/jarisplayer.swf'
      		}, function(){
      			$('#fullScreenVideo').css('display', 'block');
      			resizeVideo();
      		}); 

	        function resizeVideo(){

	            var vW = 0, vH = 0, vT = 0, vL = 0, ratio = 640/360, winW = $(window).width(), winH = $(window).height() - 140;

	            if(ratio <= winW/winH){
	                vW = Math.ceil(winW);
	                vH = Math.ceil(vW / ratio);
	                vT = Math.round((winH - vH)/2);
	            } else {
	                vH = Math.ceil(winH);
	                vW = Math.ceil(vH * ratio);
	                vL = Math.round((winW - vW)/2);
	            }

	            $('#fullScreenVideo').css({'width': vW, 'height': vH, 'top': vT+70, 'left': vL});
	            $('#fullScreenVideo_media').css({'width': vW, 'height': vH});

	        }

      		$(window).bind('resize', resizeVideo);

      		$('#playPause').click(function(){
      			projekktor('fullScreenVideo').setPlayPause();
      			$(this).children('a').toggleClass('paused');
      		});

      		var videoEvent = function(data){
      			if(data=='PAUSED' || data=='COMPLETED')
      				$('#playPause a').addClass('paused');
      			else if(data=='PLAYING')
      				$('#playPause a').removeClass('paused');
      		}
      		projekktor('fullScreenVideo').addListener('state', videoEvent);

      		if(touchM)
      			$('#playPause').children('a').addClass('paused');

		}

		/* Posts & Pages slider */

		if($('#postSlider').length	> 0){
				$("#postSlider").slides({
				effect: 'fade',
				pagination: false,
				next: 'sliderBtnNext',
				prev: 'sliderBtnPrev',
				generatePagination: false,
				customPagination: 'sliderPagination',
				crossfade:true
			});
		}
	
		/* Images roll over effect */

		$('img.imgFrame').hover(function(){
			$(this).stop().animate({'opacity': .8}, 200);
		}, function(){
			$(this).stop().animate({'opacity': 1}, 200);
		});
	
		/* Input replacement & roll over */

		$('input, textarea').each(function(){
		
			if(!$(this).hasClass('submit') && $(this).attr('id') != 'submit'){
				$(this).attr('data-value', $(this).val())
					.focus(function(){
						$(this).addClass('focusInput');
						if($(this).val() == $(this).attr('data-value')){
							$(this).val('');
						} else {
							$(this).select();
						}
					})
					.blur(function(){
						$(this).removeClass('focusInput');
						if($(this).val() == ''){
							$(this).val($(this).attr('data-value'));
						}
					});
			}
			
		});
		
		/* Contact form handling */

		if($('#contact').length > 0){
			
			var $name = $('#formName');
			var $email = $('#formEmail');
			var $message = $('#formMessage');
			var $error = $('#contact p.contactError');

			$('#submit').click(function(){
				
				var ok = true;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

				if($name.val().length < 3 || $name.val() == $name.data('value')){
					showError($name);
					ok = false;
				}
				
				if($email.val() == '' || $email.val() == $email.data('value') || !emailReg.test($email.val())){
					showError($email);
					ok = false;
				}
				
				if($message.val().length < 5 || $message.val() == $message.data('value')){
					showError($message);
					ok = false;
				}
				
				function showError($input){
					$input.val($input.data('value'));
					$input.addClass('contactErrorBorder');
					$error.fadeIn();
				}
				
				if(ok){
				
					$('#contact form').fadeOut();
					
					$.ajax({
						type: 'POST',
						url: $.base64.decode(window.d280sw) + '/contact-form.php',
						data: 'name=' + $name.val() + '&email=' + $email.val() + '&message=' + $message.val(),
						success: function(){
							$('#contact').html($.base64.decode(window.cn932fh)).hide().fadeIn();
						}
					});
					
				}
				
				return false;
			
			});
			
			$name.focus(function(){resetError($(this))});
			$email.focus(function(){resetError($(this))});
			$message.focus(function(){resetError($(this))});

			function resetError($input){
				$input.removeClass('contactErrorBorder');
				$error.fadeOut();
			}
		
		}
		
	});

	/* Links roll over effect */
	$('a').each(function(){
		if(!$(this).data('filter') && !$(this).parent().parent().parent().hasClass('pagination'))
			$(this).hoverFadeColor();
	})

	/* Social icons roll over effect */
	if(!$('html').hasClass('ie8'))
		$('.socialList li a').each(function(){
			$(this).parent().append($(this).clone());
			$(this).addClass('socialHover').css('backgroundPosition', ' -18px ' + $(this).css('backgroundPosition').slice($(this).css('backgroundPosition').indexOf('-'), $(this).css('backgroundPosition').indexOf('px', $(this).css('backgroundPosition').indexOf('-'))) + 'px');
			$(this).parent().hover(function(){
				$(this).find('.socialHover').stop().animate({'opacity': 1}, 300, 'linear');
			}, function(){
				$(this).find('.socialHover').stop().animate({'opacity': 0}, 300, 'linear');
			});
		});

	/* Page holder Interaction */

	
	if(!$body.hasClass('page-template-template-slideshow-php'))
		$('.minimize').minimize($(this));

	/* Sidebar Interaction */

	var mobile = ($(document).width() < 640 ? true : false);
	var smaller = ($(document).width() < 360 ? true : false);
	var $sidebar = $('#sidebar');
	var $topFooter = $('#topFooter');
	var $bottomFooter = $('#bottomFooter');
	var $content = $('#content > div');
	var $close = $('#close');
	var $rightFooter = $('#topFooter div.right');
	var $supersized = $('#supersizedControls');
	var $fSlide = $('.page-template-template-slideshow-php section.galleryContent');

	if($body.hasClass('page-template-template-slideshow-php') && $body.hasClass('Stick')) $.topBoss = 'opened';

	if($body.hasClass('Stick'))
		$body.addClass('topBoss');

	var sidebarOpened = true;
	$close.click(function(){
		if(sidebarOpened){
			closeSidebar();
			$.topBoss = 'closed';
			$body.removeClass('topBoss');
		} else {
			openSidebar();
			$.topBoss = 'opened';
			$body.addClass('topBoss');
		}
		return false;
	});

	if(!sidebarOpened) {
		if($.cookie('sidebar_cookie_2') == 'opened' || $.cookie('sidebar_cookie_2') == 'null')
			initSidebar('opened');
		else if($.cookie('sidebar_cookie_2') == 'closed')
			initSidebar('closed');
	}

	function initSidebar(type){
		if(type == 'opened' && !mobile){
			$sidebar.css('marginLeft', 0);
			$topFooter.css('marginLeft', 280);
			$rightFooter.css('marginRight', 280);
			$bottomFooter.css('marginLeft', 280);
			$content.css('marginLeft', 280);
			$supersized.css('left', 280);
			$fSlide.css('left', 280);
		} else if(type =='closed' && !mobile){
			$sidebar.css('marginLeft', -270);
			$topFooter.css('marginLeft', 0);
			$rightFooter.css('marginRight', 0);
			$bottomFooter.css('marginLeft', 0);
			$content.css('marginLeft', 0);
			$supersized.css('left', 0);
			$fSlide.css('left', 0);
		}
	}

	function closeSidebar(){
		$.cookie('sidebar_cookie_2', 'closed', {expires:7, path: '/'});
		$close.addClass('openIcon');
		if(!mobile){
			$sidebar.stop().animate({'marginLeft': -270}, 600, 'swing');
			$topFooter.stop().animate({'marginLeft': 0}, 600, 'swing');
			$rightFooter.stop().animate({'marginRight': 0}, 600, 'swing');
			$bottomFooter.stop().animate({'marginLeft': 0}, 600, 'swing');
			$content.stop().animate({'marginLeft': 0}, 600, 'swing');
			$supersized.stop().animate({'left': 0}, 600, 'swing');
			$fSlide.stop().animate({'left': 0}, 600, 'swing');
		} else {
			if(smaller)
				$sidebar.css('marginTop', '-90px !important');
			else
				$sidebar.css('marginTop', '-40px !important');
		}
		setTimeout(function(){
			sidebarOpened = false;
		}, 600);
	}
	function openSidebar(){
		$close.removeClass('openIcon');
		$.cookie('sidebar_cookie_2', 'opened', {expires:7, path: '/'});
		if(!mobile){
			$sidebar.stop().animate({'marginLeft': 0}, 600, 'swing');
			$topFooter.stop().animate({'marginLeft': 280}, 600, 'swing');
			$rightFooter.stop().animate({'marginRight': 280}, 600, 'swing');
			$bottomFooter.stop().animate({'marginLeft': 280}, 600, 'swing');
			$content.stop().animate({'marginLeft': 280}, 600, 'swing');
			$supersized.stop().animate({'left': 280}, 600, 'swing');
			$fSlide.stop().animate({'left': 280}, 600, 'swing');
		} else {
			$sidebar.css('marginTop', '0 !important');
		}
		setTimeout(function(){
			sidebarOpened = true;
		}, 600);
	}


	var autoCloseI;

	var autoCloseSidebar = $body.hasClass('Stick') ? false : true;

	if(!autoCloseSidebar && !mobile) $fSlide.css('left', 280);

	if(autoCloseSidebar) {
		$(document).mousemove(function(event){
			$.cookie('mouse_cookie', event.pageX, {path: '/'});
			if($(document).width() > 640)
				if(event.pageX < 40 && !sidebarOpened){
					clearTimeout(autoCloseI);
					openSidebar();
				} else if(event.pageX > 300 && sidebarOpened){
					clearTimeout(autoCloseI);
					closeSidebar();
				}
		});

		autoCloseI = setTimeout(function(){
			if(parseInt($.cookie('mouse_cookie')) > 280)
				closeSidebar();
		}, 1000);

	}

	if(mobile){
		$('.footer').children('div').children('div').each(function(){
			$(this).css({'paddingLeft': '50%', 'marginLeft': -$(this).width()/2})
		});
	} else {
		$('.footer').children('div').children('div').each(function(){
			$(this).css({'paddingLeft': 'auto', 'marginLeft': 'auto'})
		});
	}

	/* Check for videos & fix blog navigation */

	var videoOn1 = $('.post #postSlider .slides_container iframe').length > 0;
	var videoFiles1 = $('.post #postSlider .slides_container div');
	var videoOn2 = $('.page #postSlider .slides_container iframe').length > 0;
	var videoFiles2 = $('.page #postSlider .slides_container div');

	/* Init portfolio */
 
	if($('#portfolio').length > 0) $('#portfolio').marsPortfolio(autoCloseSidebar);
	if($('#gallery').length > 0) $('#gallery').marsGallery(autoCloseSidebar);

	/*Handle responsive menu */

	$('#responsiveMenu select').styledSelect().bind('change', function(){
		document.location.href = $(this).find('option:selected').data('href');
	});

	var fR = true, $logo = $('#logo');
	if(smaller) $logo.css({'width': $logo.width(), 'marginLeft': -$logo.width()/2});
	$(window).resize(function(){

		if($(document).width() < 360 && fR){
			fR = false;
			smaller = true;
			$logo.css({'width': $logo.width(), 'marginLeft': -$logo.width()/2});
		} else if($(document).width() >= 360) {
			fR = true;
			smaller = false;
			$logo.css({'width': 'auto', 'marginLeft': '0'});
		}

		if($('#mobileCheck').css('display') == 'block')
			mobile = true;
		else
			mobile = false;

		if(mobile){
			$fSlide.css('left',0);
			if(!sidebarOpened){
				$sidebar.stop().css('marginLeft', 0);
				if(smaller)
					$sidebar.css('marginTop', -90);
				else
					$sidebar.css('marginTop', -40);
			} else {
				$sidebar.css('marginTop', 0);
			}
		} else {
			if(autoCloseSidebar) {
				sidebarOpened=false;
				$sidebar.css('marginTop', 0);
				if(!sidebarOpened){
					$sidebar.css('marginLeft', -270);
					$topFooter.css('marginLeft', 0);
					$rightFooter.css('marginRight', 0);
					$bottomFooter.css('marginLeft', 0);
					$content.css('marginLeft', 0);
					$supersized.css('left', 0);
					$fSlide.css('left', 0);
				} else {
					$sidebar.css('marginLeft', 0);
					$topFooter.css('marginLeft', 280);
					$rightFooter.css('marginRight', 280);
					$bottomFooter.css('marginLeft', 280);
					$content.css('marginLeft', 280);
					$supersized.css('left', 280);
					$fSlide.css('left', 280);
				}
			}
		}

		if($.topBoss == 'closed' && !mobile && !autoCloseSidebar){
			sidebarOpened=false;
			$sidebar.css('marginTop', 0);
			$sidebar.css('marginLeft', -270);
			$topFooter.css('marginLeft', 0);
			$rightFooter.css('marginRight', 0);
			$bottomFooter.css('marginLeft', 0);
			$content.css('marginLeft', 0);
			$supersized.css('left', 0);
			$fSlide.css('left', 0);
		}

		if($.topBoss == 'opened' && !autoCloseSidebar) $fSlide.css('left', 280);

		if(videoOn1)
			videoFiles1.css('width', $('.post').innerWidth()-100);
		if(videoOn2)
			videoFiles2.css('width', $('.contentHolder').innerWidth()-100);

		if(mobile){
			$('.footer').children('div').children('div').each(function(){
				$(this).css({'paddingLeft': '50%', 'marginLeft': -$(this).width()/2})
			});
		} else {
			$('.footer').children('div').children('div').each(function(){
				$(this).css({'paddingLeft': '0', 'marginLeft': 'auto'})
			});
		}

	});

	$('#top').click(function(){
		$('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');
		return false;
	});

	/* Rework IE8 background */
	if($('html').hasClass('ie8')){

		var curBg = $body.attr('style');

		if(curBg != undefined && curBg != null && curBg != ''){

	        curBg = curBg.split('('); 
	        curBg = curBg[1].split(')');  

			$body.css('background-image', 'none !important');

			var $ie8back = $body.append('<div id="#ie8back"></div>');

			$ie8back.css({ 
	            "filter" : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+curBg[0]+"', sizingMethod='scale')", 
	            "-ms-filter" : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+curBg[0]+"', sizingMethod='scale')",
	            "width" : "100%",
	            "height" : "100%",
	            "postion" : "fixed",
	            "backgroundImage" : ""

	            });          

        }
 
	}

	/* Setup fullscreen slideshow page template */

	if($body.hasClass('page-template-template-slideshow-php')){

		$('#content').append('<ul id="supersized"></ul>');

		var imgArray = new Array();
		$('#projectSlides').children('img').each(function(){

			imgArray.push({
				image: $(this).attr('src'),
				title: $(this).attr('title')
			})

		});

		var fitPortrait = $body.hasClass('Fit') ? 1 : 0;

		$.supersized({
			slides: imgArray,
			transition: 1,
			transition_speed: 1000,
			horizontal_center: 12,
			image_protect: 0,
			fit_portrait: fitPortrait,
			fit_landscape: 0
		});

	}

	/* Setup iPad motion */

	if(touchM){
		$('#sidebar').touchSwipe(function(dir){
			if($(window).width() > 640){
				if(dir == 'right')
					openSidebar();
				else if(dir == 'left')
					closeSidebar();
			}
		})
	}   

	if(touchM)
		$('input').onfocus = function() {
	    	window.scrollTo(0, 0);
	        document.body.scrollTop = 0;
	    }

	/* Fix WPML filters - uncomment this if you are using in a multilanguage environment */
	/* var totalAll = 0, $allText = $('a[data-all]');
	$('a[data-category]').each(function(){
		totalAll += parseInt($(this).text().slice($(this).text().indexOf('(') + 1, $(this).text().indexOf(')')));
	});
	$allText.text($allText.text().replace($allText.text().slice($allText.text().indexOf('(') + 1, $allText.text().indexOf(')')), totalAll)); */

})(jQuery);