function Tetromino() {
	/*Attributs*/

	/*Type de forme*/
	this.type = Tetromino.getType();
	/*Representation de la forme*/
	this.forme = Tetromino.createForme(this.type);
	/*Taille de la forme*/
	this.longueur = Math.sqrt(this.forme.length);

	/*Tableau des indices du Tetromino*/
	this.coord = [];

	/*Position du Tetromino*/
	this.posx = parseInt(nbColonnes / 2, 10) - 1;
	this.posy = -this.getConteneur().min.y;

	/*Initialisations*/
	this.coord = this.formeToCoord();
}

/*Méthodes*/

Tetromino.prototype.rotate = function () {
	/* Fait tourner le tetromino si c'est possible */
	if (this.type === 1 || this.longueur === 1) {
		/*Si le tetromino est la forme o, ou qu'il n'y à
		 qu'un bloc on ne fait rien*/
		return;
	}

	if (this.canRotate()) {
		this.forme = this.rotateForme();
		this.coord = this.formeToCoord();
		return;
	}

	/*Gestion des wall-kicks,
		on regarde de combien ça dépasse et on essaye
		de tourner le tetromino en le décalant*/
	var kicks = this.depasse(),
		backup = this.posx;

	for (i = 0; i < Math.abs(kicks); i++) {
		if (kicks < 0) {
			this.posx++;
		} else {
			this.posx--;
		}

		if (this.canRotate()) {
			this.forme = this.rotateForme();
			this.coord = this.formeToCoord();
			return;
		}
	}

	this.posx = backup;

};

Tetromino.prototype.canRotate = function () {
	var i, j, tab;

	tab = this.formeToCoord(this.rotateForme());
	/*Si l'un des bloc du Tetromino est à l'exterieur du tableau (sauf en haut)
		ou si le bloc est bien défini dans le tableau mais que la case n'est pas vide*/
	for (i = 0; i < tab.length; i++) {
		if (tab[i].x < 0 || tab[i].x >= nbColonnes || tab[i].y >= nbLignes) {
			return false;
		} else if (tab[i].x >= 0 && tab[i].x < nbColonnes && tab[i].y >= 0 && tab[i].y < nbLignes) {
			if (tetrisBoard[tab[i].x][tab[i].y] != CASEVIDE) {
				return false;
			}
		}
	}

	return true;
};

Tetromino.prototype.depasse = function () {
	/*Renvoie de combien le tetromino depasse à droite ou à gauche du tableau*/
	var i, j, tab;
	var depasse = 0,
		tab = this.formeToCoord(this.rotateForme());

	for (i = 0; i < tab.length; i++) {
		if (tab[i].x < 0) {
			depasse--;
		} else if (tab[i].x >= nbColonnes) {
			depasse++;
		}
	}
	if (depasse != 0) {
		return depasse;
	}

};

Tetromino.prototype.rotateForme = function () {
	/*Retourne la forme actuelle mais tourné de 90°*/
	var i, j, longueur, tab, borne;
	longueur = Math.sqrt(this.forme.length);
	tab = [this.forme.length];

	for (i = 0; i < longueur; i++) {
		for (j = 0; j < longueur; j++) {
			tab[i * longueur + j] = this.forme[(longueur - 1 - j) * longueur + i];
		}
	}

	return tab;
};

Tetromino.prototype.getConteneur = function (forme) {
	/*Cherche le plus petit conteneur rectangulaire de la forme*/
	if (forme == undefined) {
		forme = this.forme;
	}
	var i, j, borne;
	borne = {
		max: {
			x: 0,
			y: 0
		},
		min: {
			x: this.longueur + 1,
			y: this.longueur + 1
		}
	};

	for (i = 0; i < this.longueur; i++) {
		for (j = 0; j < this.longueur; j++) {
			if (forme[i * this.longueur + j] == 1) {
				if (borne.min.x > i) {
					borne.min.x = i;
				}
				if (borne.max.x < i) {
					borne.max.x = i;
				}
			}
			if (forme[j * this.longueur + i] == 1) {
				if (borne.min.y > i) {
					borne.min.y = i;
				}
				if (borne.max.y < i) {
					borne.max.y = i;
				}
			}
		}
	}
	return borne;
}

Tetromino.prototype.formeToCoord = function (forme) {
	/*Transforme la forme en coordonnées grâce a posx et posy*/
	var i, j, borne, tab;

	if (forme == undefined) {
		forme = this.forme;
	}

	tab = [];
	for (i = 0; i < this.longueur; i++) {
		for (j = 0; j < this.longueur; j++) {
			if (forme[i * this.longueur + j] === 1) {
				tab.push({
					x: this.posx + i,
					y: this.posy + j
				});

			}
		}
	}

	return tab;
};

Tetromino.prototype.formeToCoordTasse = function (forme) {
	/*Transforme la forme en coordonnées grâce a posx et posy
	  mais la forme sera le plus en haut à gaucher possible
	  de son tableau forme*/
	var i, j, borne, tab;

	if (forme == undefined) {
		forme = this.forme;
	}

	borne = this.getConteneur(forme);

	tab = [];
	for (i = borne.min.x; i <= borne.max.x; i++) {
		for (j = borne.min.y; j <= borne.max.y; j++) {
			if (forme[i * this.longueur + j] === 1) {
				tab.push({
					x: this.posx + i - borne.min.x,
					y: this.posy + j - borne.min.y
				});

			}
		}
	}

	return tab;
};

Tetromino.prototype.canTranslateG = function () {
	var i, tab;
	tab = this.coord;
	for (i = 0; i < tab.length; i++) {
		if (tab[i].x == 0 || tetrisBoard[tab[i].x - 1][tab[i].y] != CASEVIDE) {
			return false;
		}
	}
	return true;
};

Tetromino.prototype.canTranslateD = function () {
	var i, tab;
	tab = this.coord;
	for (i = 0; i < tab.length; i++) {
		if (tab[i].x == nbColonnes - 1 || tetrisBoard[tab[i].x + 1][tab[i].y] != CASEVIDE) {
			return false;
		}
	}
	return true;
};

Tetromino.prototype.canTranslateB = function () {
	var i, tab;
	tab = this.coord;
	for (i = 0; i < tab.length; i++) {
		if (tab[i].y == nbLignes - 1 || tetrisBoard[tab[i].x][tab[i].y + 1] != CASEVIDE) {
			return false;
		}
	}
	return true;

};

Tetromino.prototype.translateG = function () {
	/*Deplace le tetromino vers la gauche si c'est possible*/
	if (this.canTranslateG()) {
		var i;
		for (i = 0; i < this.coord.length; i++) {
			this.coord[i].x--;
		}
		this.posx--;
		return true;
	}
	return false;
};

Tetromino.prototype.translateD = function () {
	/*Deplace le tetromino vers la droite si c'est possible*/
	if (this.canTranslateD()) {
		var i;
		for (i = 0; i < this.coord.length; i++) {
			this.coord[i].x++;
		}
		this.posx++;
		return true;
	}
	return false;
};

Tetromino.prototype.translateB = function () {
	/*Deplace le tetromino vers le bas si c'est possible*/
	if (this.canTranslateB()) {
		var i;
		for (i = 0; i < this.coord.length; i++) {
			this.coord[i].y++;
		}
		this.posy++;
		return true;
	}
	return false;
};

Tetromino.prototype.freeze = function () {
	/*Met les indices du tetromino
	dans tetrisBoard*/
	var i;
	for (i = 0; i < this.coord.length; i++) {
		tetrisBoard[this.coord[i].x][this.coord[i].y] = Tetromino.color[this.type];
	}
};

Tetromino.prototype.draw = function () {
	/*Dessine le tetromino sur le canvas*/
	var i, j;
	for (i = 0; i < this.coord.length; i++) {
		drawBlock(this.coord[i].x, this.coord[i].y, Tetromino.color[this.type]);
	}
};

function randColor() {
	var colorR, colorG, colorB, min, max;
	max = 240;
	min = 50;
	colorR = Math.floor((Math.random() * (max - min)) + min);
	colorG = Math.floor((Math.random() * (max - min)) + min);
	colorB = Math.floor((Math.random() * (max - min)) + min);
	return "rgb(" + colorR + "," + colorG + "," + colorB + ")";
}

/*Static*/

Tetromino.init = function () {
	/*Initialise les différente types de forme*/
	if (Tetromino.forme == undefined) {
		Tetromino.backupForme();
	}

	/*Si il y a des formes utilisateurs on les ajoute*/
	var bUserBlock = true;
	if (localStorage['userBlock'] && bUserBlock) {
		Tetromino.addUserBlock();
	}

	/*Initialise les variables static*/
	Tetromino.nbForme = Tetromino.forme.length;
	Tetromino.color = [];
	Tetromino.file = [5, 6, 5, 6];
	Tetromino.initColor();
};

Tetromino.initColor = function () {
	/*Donne une couleur à chaque type de forme*/
	var i;
	for (i = 0; i < Tetromino.nbForme; i++) {
		Tetromino.color.push(randColor());
	}
};

Tetromino.getType = function () {
	/*Renvoie un type de forme au hasard*/
	var i, ret;
	for (i = 0; i < 6; i++) {
		ret = parseInt(Math.random() * Tetromino.nbForme, 10);
		if (Tetromino.file.indexOf(ret) === -1) {
			Tetromino.file.shift();
			Tetromino.file.push(ret);
			return ret;
		}
	}
	Tetromino.file.shift();
	Tetromino.file.push(ret);
	return ret;
};

function isInt(value) {
	if (isNaN(value)) {
		return false;
	}
	var x = parseFloat(value);
	return (x | 0) === x;
}


Tetromino.createForme = function (type) {
	return Tetromino.forme[type];
};

Tetromino.addForme = function (forme) {
	/*Ajoute la forme passée en paramètre aux formes disponibles*/
	if (isInt(Math.sqrt(forme.length))) {
		Tetromino.forme.push(forme);
		Tetromino.nbForme = Tetromino.forme.length;
	} else {
		window.console.log('La forme n\'est pas carrée');
	}
};

Tetromino.addUserBlock = function () {
	/*Ajoute tout les blocs utilisateurs aux formes disponibles*/
	var userBlock = JSON.parse(localStorage['userBlock']);
	for (i = 0; i < userBlock.length; i++) {
		Tetromino.addForme(userBlock[i].forme);
	}
};

Tetromino.backupForme = function () {
	/*Restaure les formes d'origine*/
	Tetromino.forme = [[0, 1, 0, 0,
						0, 1, 0, 0,
						0, 1, 0, 0,
						0, 1, 0, 0],
						[1, 1,
						 1, 1],
					   [0, 1, 0,
						0, 1, 1,
						0, 1, 0],
					   [0, 1, 0,
						0, 1, 0,
						0, 1, 1],
					   [0, 1, 1,
						0, 1, 0,
						0, 1, 0],
					   [1, 0, 0,
						1, 1, 0,
						0, 1, 0],
					   [0, 1, 0,
						1, 1, 0,
						1, 0, 0]
				  ];
	Tetromino.nbForme = Tetromino.forme.length;
};

/*var blockI = [0, 1, 0, 0,
			  0, 1, 0, 0,
			  0, 1, 0, 0,
			  0, 1, 0, 0];

var blockO = [1, 1,
			  1, 1];

var blockT = [0, 1, 0,
			  1, 1, 1,
			  0, 0, 0];

var blockL = [0, 1, 0,
			  0, 1, 0,
			  0, 1, 1];

var blockJ = [0, 1, 0,
			  0, 1, 0,
			  1, 1, 0];

var blockS = [1, 0, 0,
			  1, 1, 0,
			  0, 1, 0];

var blockZ = [0, 1, 0,
			  1, 1, 0,
			  1, 0, 0];*/
