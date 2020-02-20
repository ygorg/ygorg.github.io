function drawBackground(color) 
{/* Dessine le fond dans la couleur passée en paramètre */
	tetrisCtx.save();
	tetrisCtx.fillStyle = color;
	tetrisCtx.fillRect(0, 0, canvwidth, canvheight);
	//tetrisCtx.clearRect(0, 0, canvwidth, canvheight);
	tetrisCtx.restore();
}

function clearBackground() 
{/* Rend le fond transparent et vide */
	tetrisCtx.clearRect(0, 0, canvwidth, canvheight);
}

function drawBlock(x, y, color) 
{
	/*Dessine un bloc à la position x, y de la couleur color*/
	tetrisCtx.save();
	tetrisCtx.fillStyle = color;
	tetrisCtx.fillRect(x * blockwidth, y * blockheight, blockwidth, blockheight);
	tetrisCtx.restore();
}

function drawBoard() 
{
	//Dessine les blocs du tableau grâces aux informations de tetrisBoard
	var i, j;
	for (i = 0; i < nbColonnes; i++)
		for (j = 0; j < nbLignes; j++)
			if (tetrisBoard[i][j] !== CASEVIDE) 
				drawBlock(i, j, tetrisBoard[i][j]);
}
