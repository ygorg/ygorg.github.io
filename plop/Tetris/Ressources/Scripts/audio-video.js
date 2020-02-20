function togglePlayVideo() {
	/* Si la vidéo du nyan cat se joue on l'arrête sinon on la démarre */
	if (videoIsPlaying() == true) {
		$('#video-fond').hide();
		$('video').trigger('pause');
	} else {
		$('video').trigger('play');
		$('#video-fond').show();
	}

}

function videoIsPlaying() {

	return !$('video')[0].paused;

}

function lireAudio() {
	/*
		Lis une musique au hasard
	*/
	var audio = $('audio');
	var nbr;
	/* On met la file en static pour ne pas polluer le global */
	if (!arguments.callee.fileAudio) {
		arguments.callee.fileAudio = [-1, -1, -1, -1];
	}
	for (i = 0; i < 4; i++) {
		nbr = parseInt(Math.random() * 400, 10) % audio.length;
		if (arguments.callee.fileAudio.indexOf(nbr) == -1) {
			break;
		}
	}

	audio[nbr].curentTime = 0;
	audio[nbr].play();

	arguments.callee.fileAudio.push(nbr);
	arguments.callee.fileAudio.shift();
}

function togglePlayAudio() {
	
	/* Si une musique se joue se joue on la met en pause sinon on la redémarre */

	if (!arguments.callee.nowPlaying) {
		arguments.callee.nowPlaying = -1;
	}

	var nbr = audioIsPlaying(),
		audio = $('audio');

	if (nbr == -1 && arguments.callee.nowPlaying != -1) {
		audio[arguments.callee.nowPlaying].play();
		arguments.callee.nowPlaying = -1;
	} else if (nbr > 0) {
		arguments.callee.nowPlaying = nbr;
		audio[arguments.callee.nowPlaying].pause();
	}

}

function audioIsPlaying() {
	var audio = $('audio');
	for (i = 0; i < audio.length; i++) {
		if (!audio[i].paused) {
			return i;
		}
	}
	return -1;
}
