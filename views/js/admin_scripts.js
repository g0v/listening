    jQuery(function(jQuery) {  
      
        jQuery('.custom_upload_image_button').click(function() {  
            jQuery.formfieldA = jQuery(this).parent().siblings('.custom_upload_image');  
            jQuery.previewA = jQuery(this).parent().siblings('.custom_preview_image');  
            tb_show('', 'media-upload.php?type=image&TB_iframe=true');  
            window.send_to_editor = function(html) {  
                var imgurl = jQuery('img',html).attr('src');  
                jQuery.formfieldA.val(imgurl);  
                jQuery.previewA.attr('src', imgurl);  
                jQuery.previewA.css('width', 300);  
                tb_remove();  
            }  
            return false;  
        });  
      
        jQuery('.custom_clear_image_button').click(function() {  
            var defaultImage = jQuery(this).parent().parent().siblings('.custom_default_image').text();
            
            jQuery(this).parent().parent().siblings('.custom_upload_image').val('');  
            jQuery(this).parent().parent().siblings('.custom_preview_image').attr('src', defaultImage); 
            return false;  
        });  
		
		var emailAddresses = '';
		function reviewEmailAddresses(){
			emailAddresses = '';
			jQuery('#newsFields').find('td.column-email a').each(function(){
				emailAddresses += '<' + jQuery(this).text() + '>,';
			});
			jQuery('#newsTextArea').val(emailAddresses);
		}
		reviewEmailAddresses();
		
		jQuery('.newsCopyAll').click(function(){
			//location.href='#newsTextArea';
			jQuery('#newsTextArea').select();
		});
		
		jQuery('.newsDeleteSingle').click(function(){
			var id = jQuery(this).parent().parent().attr('id').slice(1, jQuery(this).parent().parent().attr('id').length);
			jQuery.get('../wp-content/themes/corvius/newsletter/newsletter_delete.php?type=single&id='+id, function(data){
				jQuery('#e'+id).remove();
				reviewEmailAddresses();
			});
			return false;
		});
		
		jQuery('.newsDeleteAll').click(function(){
			jQuery.get('../wp-content/themes/corvius/newsletter/newsletter_delete.php?type=all&id=0', function(data){
				jQuery('#newsFields').remove();
				reviewEmailAddresses();
			});
			return false;
		});

		/* Metaboxes slider */

		var sliderI = parseInt(jQuery('.slider-index').text());
		var sliderID = jQuery('.slider-id').text();

		jQuery('.repeatable-add.add-image').click(function() {  

			sliderI++;

			var $li = jQuery('<li><input name="'+sliderID+'['+sliderI+']" type="hidden" class="custom_upload_image" value="" /><img src="../wp-content/themes/wowway/images/defHolder.png" class="custom_preview_image" alt="" /><div><input class="custom_upload_image_button button" type="button" value="Choose Image" /><small> <a href="#" class="repeatable-remove">Remove Slide</a></small></div></li>');

			jQuery('.custom_repeatable').append($li);

			/* Binding */

		    jQuery('.repeatable-remove').click(function(){  
		        jQuery(this).parent().parent().parent().remove();  
		        return false;  
		    });  

	        jQuery('.custom_upload_image_button').click(function() {  
	            jQuery.formfieldA = jQuery(this).parent().siblings('.custom_upload_image');  
	            jQuery.previewA = jQuery(this).parent().siblings('.custom_preview_image'); 
	            tb_show('', 'media-upload.php?type=image&TB_iframe=1');  

	            window.send_to_editor = function(html) {  
	                var imgurl = jQuery('img',html).attr('src');  
	                jQuery.formfieldA.val(imgurl);  
	                jQuery.previewA.attr('src', imgurl);  
	                jQuery.previewA.css('width', 300);  
	                tb_remove();  
	            }  

				function killTheDamnUnloadEvent(e) {
					console.log('hell');
				    // you
				    e.stopPropagation();
				    // must
				    e.stopImmediatePropagation();
				    // DIE!
				    return false;
				}
	            return false;  
	        });  
	      
	        jQuery('.custom_clear_image_button').click(function() {  
	            var defaultImage = jQuery(this).parent().parent().siblings('.custom_default_image').text();
	            
	            jQuery(this).parent().parent().siblings('.custom_upload_image').val('');  
	            jQuery(this).parent().parent().siblings('.custom_preview_image').attr('src', defaultImage); 
	            return false;  
	        });  

	        return false;

	    });  

		jQuery('.repeatable-add.add-video').click(function() {  

			sliderI++;

			var $li = jQuery('<li><textarea name="'+sliderID+'['+sliderI+']" data-value="Paste your embed code here">Paste your embed code here</textarea><div><small><a href="#" class="repeatable-remove">Remove Slide</a></small><img src="../wp-content/themes/wowway/images/defMove.png" class="moveimg" /></div></li>');

			jQuery('.custom_repeatable').append($li);

			/* Binding */

		    jQuery('.repeatable-remove').click(function(){  
		        jQuery(this).parent().parent().parent().remove();  
		        return false;  
		    }); 

			jQuery('textarea').each(function(){
			
				jQuery(this)
					.focus(function(){
						if(jQuery(this).val() == jQuery(this).attr('data-value')){
							jQuery(this).val('');
						} else {
							jQuery(this).select();
						}
					})
					.blur(function(){
						if(jQuery(this).val() == ''){
							jQuery(this).val(jQuery(this).attr('data-value'));
						}
					});
				
			});

		    return false;

	    });  
	      
	    jQuery('.repeatable-remove').click(function(){  
	        jQuery(this).parent().parent().parent().remove();  
	        return false;  
	    });  
	      
	    jQuery('.custom_repeatable').sortable({  
	        opacity: 0.6,  
	        revert: true,  
	        cursor: 'move',  
	        handle: 'img'  
	    });  


		jQuery('textarea').each(function(){
		
			jQuery(this)
				.focus(function(){
					if(jQuery(this).val() == jQuery(this).attr('data-value')){
						jQuery(this).val('');
					} else {
						jQuery(this).select();
					}
				})
				.blur(function(){
					if(jQuery(this).val() == ''){
						jQuery(this).val(jQuery(this).attr('data-value'));
					}
				});
			
		});
		
      
    });  

