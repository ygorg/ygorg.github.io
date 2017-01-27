/*global $:true, images:true*/

var loaded_images;
var slideshow_ctx;
var slideshow_timeOut;

function disp_large(image) {
	'use strict';
	$('#large').css('background-image', 'url("' + image + '")');
}

function create_thumbnails() {
	'use strict';
	var i;
	for (i = 0; i < images.length; i = i + 1) {
		$('#thumbnails').append($('<img>').attr('src', images[i]).addClass('thumbnails'));
	}
	$('#thumbnails > img').on('click', function () {
		disp_large(this.src.replace('thumbs', 'pictures'));
	});
}

function load_images() {
	'use strict';
	var i, tmp;
	for (i = 0; i < images.length; i = i + 1) {
		tmp = new Image();
		tmp.onload = (function (obj) {
			return function () {
				loaded_images.push(obj);
			};
		}(tmp));
		tmp.src = images[i].replace('thumbs', 'pictures');
	}
}

function slideshow_showImage(image1, image2, alpha) {
	'use strict';

	var min;
	if (image1.height < image2.height) {
		min = image1.height;
	} else {
		min = image2.height;
	}

	$('#slideshow_canvas').attr('height', min);
	$('#slideshow_canvas').attr('width', image1.width);

	slideshow_ctx.clearRect(0, 0, 2000, 2000);
	slideshow_ctx.drawImage(image1, 0, 0);

	slideshow_ctx.save();
	slideshow_ctx.globalAlpha = alpha;
	slideshow_ctx.drawImage(image2, 0, 0);
	slideshow_ctx.restore();
}

function slideshow_loop(indice, alpha) {
	'use strict';

	slideshow_showImage(loaded_images[indice], loaded_images[(indice + 1) % loaded_images.length], alpha);

	if (alpha >= 1) {
		slideshow_timeOut = setTimeout(function () {
			slideshow_loop((indice + 1) % loaded_images.length, 0);
		}, 1500);
	} else {
		slideshow_timeOut = setTimeout(function () {
			slideshow_loop(indice, alpha + 0.07);
		}, 30);
	}


}

function init() {
	'use strict';

	loaded_images = [];
	slideshow_ctx = $('#slideshow_canvas')[0].getContext('2d');

	$('#slideshow').toggle();

	$('#start').on('click', function () {
		if ($(window)[0].onkeypress === null) {
			$('#start').text('Stop Slideshow');
			//$('#slideshow')[0].webkitRequestFullscreen();
			$(window)[0].onkeypress = function () {
				$('#start').click();
			};
			slideshow_loop(parseInt((Math.random() * 100000) % loaded_images.length, 10), 0);
		} else {
			$('#start').text('Start Slideshow');
			//document.exitFullscreen;
			clearTimeout(slideshow_timeOut);
			$(window)[0].onkeypress = '';
		}
		$('#photos').toggle();
		$('#slideshow').toggle();
	});

	create_thumbnails();
	load_images();
}