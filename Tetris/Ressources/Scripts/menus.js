function menu()
{
	/* Menu principal du jeu */
	tetrisCtx.fillRect(0, 0, canvwidth, canvheight);
   	var img = document.getElementById("image_tetris");
	tetrisCtx.drawImage(img, canvwidth/2-824/2, 0, 824, 570);
	
	tetrisCtx.save();
	
	tetrisCtx.font="140px Starjout";
	tetrisCtx.fillStyle=defaultTextColor;
	tetrisCtx.textAlign="center";
	tetrisCtx.rotate(-Math.PI/12);
	tetrisCtx.fillText("reloaded", 380, 620);
	
	tetrisCtx.restore();
	/*img = document.getElementById("image_reloaded");
	tetrisCtx.drawImage(img, canvwidth/2-820/2, 570+10, 820, 105);*/
	
	img = document.getElementById("image_button");
	tetrisCtx.drawImage(img, (canvwidth/2)-(912/2), canvheight/2 + canvheight/4, 912, 258);
	
	tetrisCtx.font="170px SuperMario";
	tetrisCtx.fillStyle=defaultTextColor;
	tetrisCtx.textAlign="center";
	tetrisCtx.fillText("play", (canvwidth/2), canvheight/2 + canvheight/4 +180);
	
	
	$("canvas").click(click_button);
	
	$("#userBlockWrapper").show();
	$("#change_fun").show();
	userBlockInitMenu();	// Menu de création de pièces
	
}

function click_button(event)
{/* Callback permettant la détection d'un clic sur le bouton play ou replay */
		var posx = Math.round((event.pageX - tetrisCanvas.offsetLeft) / parseInt(window.getComputedStyle(tetrisCanvas).width, 10) * tetrisCanvas.width);
		var posy = Math.round((event.pageY - tetrisCanvas.offsetTop) / parseInt(window.getComputedStyle(tetrisCanvas).height, 10) * tetrisCanvas.height);
		//alert("posx = " +posx +" ; posy = " +posy);
		
		/* Les positions sont déterminées à la main */
		if(posx >= 52 && posx <= 955 && posy >= 1515 && posy <= 1755)
		{
			$("canvas").unbind("click");
			initGame();
			game();
		}
		
}
	
function fin_du_jeu()
{//Affiche l'écran de fin du jeu
	clearTimeout("id_dernier_mouvement");
	$("body").unbind("keydown");	// On supprime le callback sur l'évènement keydown
	block = undefined;
	
	if (videoIsPlaying()) {
		togglePlayVideo();
	}
	
	$("#userBlockWrapper").show();
	$("#change_fun").show();
	$("#clear_leaderBoard").show();
	
	tetrisCtx.fillStyle = defaultBackgroundColor;
	tetrisCtx.fillRect(0, 0, canvwidth, canvheight);
	
	tetrisCtx.font="170px myFirstFont";
	tetrisCtx.fillStyle=defaultTextColor;
	tetrisCtx.textAlign="center";
	tetrisCtx.fillText("GAME OVER", canvwidth/2, 200);
	
	tetrisCtx.font="130px LLPIXEL3";
	tetrisCtx.textAlign="left";
	tetrisCtx.fillStyle=defaultTextColor;
	tetrisCtx.fillText("Score : "+score, 20, 350);
	
	addLeader(score);
	aff_leaderboard();
	
	/* Bouton replay */
	img = document.getElementById("image_button");
	tetrisCtx.drawImage(img, (canvwidth/2)-(912/2), canvheight/2 + canvheight/4, 912, 258);
	
	tetrisCtx.font="170px SuperMario";
	tetrisCtx.fillStyle=defaultTextColor;
	tetrisCtx.textAlign="center";
	tetrisCtx.fillText("replay", (canvwidth/2), canvheight/2 + canvheight/4 +180);
	
	$("canvas").click(click_button);
	
}
