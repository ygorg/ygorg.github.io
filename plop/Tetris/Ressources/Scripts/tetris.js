/*Variable globale*/
var tetrisCanvas;	//Le canvas
var tetrisCtx; 		//Le contexte du canvas
var tetrisBoard;	//Tableau à deux dimension représentant la grille, contenant la couleur de chaque case

var block; //Bloc courant

var score = 0; // Score courant

var second; //Gestion du temps



var bUseNyanCat = false;
var bUseEpilepsy = true;
var bIsEpilepsy = false;
/* "defines" */
	//Taille du canvas
	var canvwidth = 10 * 100;
	var canvheight = 20 * 100;
	var defaultBackgroundColor = "black";
	var defaultTextColor = "white";
	
	//Taille des blocs
	var blockwidth = canvwidth / 10;
	var blockheight = canvheight / 20;
	
	//Constantes pour tetrisBoard
	var CASEVIDE = -1;
	var nbLignes = 20;
	var nbColonnes = 10;

// id des boucles
var id_fun = -1;

function stop() 
{
	debugger;
}


function scoreAug(a) {
	if (!a && a!= 0) {
		score++;
	} else {
		score += a;
	}

	fun();
}

function change_fun_mode()
{
	if(bUseNyanCat)
	{
		bUseNyanCat=false;
		bUseEpilepsy=true;
		$('#change_fun').html('Epilepsie');
	}
	else if(bUseEpilepsy)
	{
		bUseEpilepsy=false;
		bUseNyanCat=true;
		$('#change_fun').html('NyanCat');
	}
}

function nyanCat() {
	var bOnLeFait = false;
	if (score > 900)  {
		if (!videoIsPlaying()) {
			togglePlayVideo();
			togglePlayAudio();
		}

	} else {
		if (score % (parseInt(Math.sqrt(score) + 70, 10)) == 0 && score > 1) {
			bOnLeFait = true;
		}
	}

	if (bOnLeFait == true) {

		if (id_fun == -1) {

			togglePlayVideo();
			togglePlayAudio();

			id_fun = setTimeout(function () {
				togglePlayVideo();
				togglePlayAudio();
				id_fun = -1;
			}, 2500);
		}

	}
}

//CHANGEMENT

function epilepsy() {

		if (score % 60 == 0 && score > 1) {
			drawBackground(randColor());
			if (id_fun == -1) {
				bIsEpilepsy = true;
				id_fun = setInterval(function () {
					defaultBackgroundColor = randColor();
					updateAffichage();
				}, 25);

				setTimeout(function () {
					bIsEpilepsy = false;
					clearInterval(id_fun);
					defaultBackgroundColor = 'black';
					id_fun = -1;
					updateAffichage();
				}, 2000);
			}
		}

	}

function fun() { /* Gestion d'un affichage amusant lorsque le score arrive à un certain point */

	if (bUseNyanCat) {
		nyanCat();
	} else if (bUseEpilepsy) {
		epilepsy();
	}
}

function displayScore() 
{// Affichage du score courant
	$('#score').text('Score : ' + score);
}

function updateAffichage() 
{//Met à jour tous les affichages : le fond, le score et le bloc courant
	if (bIsEpilepsy) {
		drawBackground(defaultBackgroundColor);
	} else {
		clearBackground();
	}
	drawBoard();
	displayScore();
	block.draw();
}

function giveFullLines() 
{/* Remplis le tableau lignes_effacees avec le numéro des lignes qui sont pleines */
	var lignes_effacees, flag_fulline, i, j;
	lignes_effacees = [];
	
	/* Suppression des lignes pleines */
	for (i = 0; i < nbLignes; i++) // On parcours tout le tableau tetrisBoard
	{
		flag_fulline = 1;
		for (j = 0; j < nbColonnes; j++) 
		{
			if (tetrisBoard[j][i] == CASEVIDE)
			{/* Si une case de la ligne est vide, la ligne ne peut être vidée, on passe à la prochaine ligne*/
				flag_fulline = 0;
				break;
			}
		}
		
		if (flag_fulline == 1) 
		{/* Si la ligne ne contient que des cases pleines, on note son indice dans lignes_effacees */
			lignes_effacees.push(i);
			
		}
	}
	if (lignes_effacees.length === 0) /* Si le tableau est vide, aucune ligne ne peut être effacée, on retourne -1*/
		return -1;
	
	return lignes_effacees;	/* Sinon, on retourne l'adresse du tableau */
}

function erase_line() 
{
	var lignes_effacees, i, l, c;
	lignes_effacees = giveFullLines();//ligne_effacees contient maintenant les indices des lignes pleines (si il y en a )

	if (lignes_effacees === -1)	/* Si lignes_effacees vaut -1, il n'y a pas de ligne à effacer */
		return 0;
	
	/* Sinon, il vaut l'adresse du tableau des lignes effacées, on fait descendre les blocs au dessus */

	for (i = 0; i < lignes_effacees.length; i++) 
	{
		for (l = lignes_effacees[i] - 1; l >= 0; l--) { /* l = ligne */
			for (c = 0; c < nbColonnes; c++) 
			{
				tetrisBoard[c][l + 1] = tetrisBoard[c][l];
				tetrisBoard[c][l] = CASEVIDE;
			}
		}
	}
	return lignes_effacees.length;//On retourne le nombre de lignes effacees pour la gestion du score
}

function est_fin_du_jeu() 
{// Return true si la partie est terminée
	var i;
	for (i = 0; i < block.coord.length; i++) 
	{
		if (block.coord[i].y < 0) 
		{
			continue;
		}
		if (tetrisBoard[block.coord[i].x][block.coord[i].y] != CASEVIDE) 
		{
			return true;
		}
	}

	return false;
}

function get_time() 
{
	var time = new Date();
	return (time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds());
}

function descente() 
{
	var temps = get_time();/* Temps contient maintenant l'heure actuelle */
	
	if (second < temps - 1000) /* On compare l'heure à laquelle on a effectué la dernière descente à l'heure actuelle */
	{/* Si une seconde s'est écoulé, on descend à nouveau */
		second = temps;
		block.translateB();
		updateAffichage();
	}

	if (block.canTranslateB())/* Si le bloc peut encore aller vers le bas, on rappelle la descente */
		window.requestAnimationFrame(descente);
		
	else /* Sinon, on laisse au joueur une seconde pour effectuer des déplacements latéraux*/
	{
		setTimeout(function () {
			if (block.canTranslateB()) 
			{/* SI, à la fin de cette seconde, on peut à nouveau descendre vers le bas, on continue la descente */
				window.requestAnimationFrame(descente);
			}
			else 
			{/* Sinon, on gèle le block à sa position */
				block.freeze();
				
				/* On efface les lignes complètes et on incrémente le score en fonction*/
				scoreAug(100 * erase_line());
				
				game();
			}
		}, 1000);
	}
}

function game() {
	block = new Tetromino();
	
	if (!est_fin_du_jeu()) 	/* Si ce n'est pas la fin du jeu, on continue avec le nouveau tétromino */
	{
		updateAffichage();
		second = get_time();

		window.requestAnimationFrame(function () {
			descente();
		});
	}
	
	else
		fin_du_jeu();
}

function initGame() 
{

	var i, j;
	
	$("#userBlockWrapper").hide();
	$("#clear_leaderBoard").hide();
	$("#change_fun").hide();
	Tetromino.init();

	score = 0;

	//Creation du tableau à deux dimensions
	tetrisBoard = [nbColonnes];
	for (i = 0; i < nbColonnes; i++) 
	{
		tetrisBoard[i] = [nbLignes];
		for (j = 0; j < nbLignes; j++) 
		{
			tetrisBoard[i][j] = CASEVIDE;
		}
	}
	
	/* Mise en place du callback sur les flêches du clavier */
	$("body").unbind("keydown").keydown(function (event) 
	{
		
		var key = event.which;//GAUCHE=37 ; HAUT=38 ; DROITE=39 ; BAS = 40 ;
		if (key == 37)
			block.translateG();
		else if (key == 38)
			block.rotate();
		else if (key == 39)
			block.translateD();
		else if (key == 40) 
		{
			if (block.translateB()) 
			{
				scoreAug();
			}
		}
		updateAffichage();
		
	});
	
	
}


function init() 
{

	tetrisCanvas = $("canvas")[0];
	tetrisCtx = tetrisCanvas.getContext("2d");

	tetrisCanvas.width = canvwidth;
	tetrisCanvas.height = canvheight;
	
	/* Préchargement des polices */
	tetrisCtx.font="1px LLPIXEL3";
	tetrisCtx.fillText(" ",0, 0);
	tetrisCtx.font="1px myFirstFont";
	tetrisCtx.fillText(" ",0, 0);
	tetrisCtx.font="1px SuperMario";
	tetrisCtx.fillText(" ",0, 0);
	tetrisCtx.font="1px Starjout";
	tetrisCtx.fillText(" ",0, 0);
	tetrisCtx.fillRect(0, 0, canvwidth, canvheight);
	
	/* */
	
	lireAudio();

	$('audio').on('ended', function () 
	{
		lireAudio();
	});
		
	$('#mute').on('click', function () {

		if (!arguments.callee.bOn) {
			arguments.callee.bOn = 0;
		}

		if (arguments.callee.bOn == 0) {
			$('video').prop('volume', 0);
			$('audio').prop('volume', 0);
			arguments.callee.bOn = 1;
		} else {
			$('video').prop('volume', 1);
			$('audio').prop('volume', 1);
			arguments.callee.bOn = 0;
		}

	});

	$('#nextMusic').on('click', function () {
		if (!videoIsPlaying()) {
			var nbr = audioIsPlaying();
			if (nbr != -1) {
				$('audio')[nbr].pause();
			}
			lireAudio();
		}
	});

	//setTimeout(fin_du_jeu, 100);
	setTimeout(menu, 100);
}
