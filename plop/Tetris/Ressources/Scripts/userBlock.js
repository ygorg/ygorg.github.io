function aff_error_message(str) {
	
	/* Affiche un message d'erreur */
	
	if (!arguments.callee.msgErreur) {
		arguments.callee.msgErreur = [];
	}

	var noeud, tmp;
	noeud = document.getElementById('error_msg');
	tmp = noeud.appendChild(document.createElement('p'));
	tmp.id = 'error' + arguments.callee.msgErreur.length;
	tmp.innerHTML = str;
	arguments.callee.msgErreur.push('error' + arguments.callee.msgErreur.length);

	setTimeout(function (msg_erreur) {
		var noeud, id;
		id = msg_erreur.shift();
		noeud = document.getElementById(id);
		noeud.parentNode.removeChild(noeud);
	}, 2000, arguments.callee.msgErreur);

}

function isElement(o) {
	return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
	);
}

function createElement(sType, oOptions, oContenu) {
	if (typeof sType != 'string' || !sType) {
		return;
	}
	var buffer = document.createElement(sType);

	if (typeof oContenu == 'string') {
		buffer.appendChild(document.createTextNode(oContenu));
	} else if (isElement(oContenu)) {
		buffer.appendChild(oContenu);
	}

	if (typeof oOptions == 'object') {
		for (var i in oOptions) {
			if (typeof oOptions[i] == 'object' && i == 'event') {
				var oEvent = oOptions.event;
				for (var i in oEvent) {
					buffer.addEventListener(i, oEvent[i]);
				}
			} else {
				buffer.setAttribute(i, oOptions[i]);
			}
		}
	}
	return buffer;
}

function createTable(nNbTr, nNbTd, oTableOpt, oTrOpt, oTdOpt) {
	if (!nNbTr || !nNbTd) {
		return;
	}
	if (!oTableOpt) {
		oTableOpt = {};
	}
	if (!oTrOpt) {
		oTrOpt = {};
	}
	if (!oTdOpt) {
		oTdOpt = {};
	}
	var oTable, oTr, oTd, i, j;
	oTable = createElement('table', oTableOpt);
	if (oTable.className != '') {
		oTable.className += ' ';
	}
	oTable.className += 'c' + nNbTd + ' l' + nNbTr;
	for (i = 0; i < nNbTr; i++) {
		oTr = createElement('tr', oTrOpt);
		if (oTr.className != '') {
			oTr.className += ' ';
		}
		oTr.className += 'l' + i;
		for (j = 0; j < nNbTd; j++) {
			oTd = createElement('td', oTdOpt);
			if (oTd.className != '') {
				oTd.className += ' ';
			}
			oTd.className += 'c' + j + ' l' + i;
			oTr.appendChild(oTd);
		}
		oTable.appendChild(oTr);
	}
	return oTable;
}


function userBlockInitMenu() {
	$('.userBlock.menu.wrapper').show();
	$('.userBlock.create.wrapper').hide();
	$('.userBlock.manage.wrapper').hide();
}

function userBlockInitCreate() {
	$('.userBlock.menu.wrapper').hide();
	$('.userBlock.create.wrapper').show();
	$('.userBlock.manage.wrapper').hide();

	userBlockDisplayCreate();
}

function userBlockInitManage() {
	$('.userBlock.menu.wrapper').hide();
	$('.userBlock.create.wrapper').hide();
	$('.userBlock.manage.wrapper').show();

	userBlockDisplayManage();
}

function userBlockinitLocalStorage() {
	localStorage['userBlock'] = JSON.stringify([]);
}



function userBlockDisplayMenu() {}

function userBlockDisplayCreate() {

	var tmp = $('.userBlock.create.container');

	tmp.empty().unbind('click').off('click').on('click', '.userBlock.create.cell', function () {
		$(this).toggleClass('on');
	});

	$('.userBlock.create.form.size').val('');

	userBlockCreateGrid(3);
}

function userBlockDisplayManage() {
	var resetButton = $('.userBlock.manage.reset'),
		container = $('.userBlock.manage.display.container');


	if (!localStorage['userBlock']) {
		resetButton.hide();
		container.text('Vide');
		return;
	} else {
		if (JSON.parse(localStorage['userBlock']).length == 0) {
			resetButton.hide();
			container.text('Vide');
			return;
		}
	}

	container.empty();

	resetButton.show();

	resetButton.off('click').on('click', function (e) {
		if (confirm('Cela va supprimer tout les blocs créés par l\'utilisateur.\nÊtes-vous sûr ?')) {
			localStorage.removeItem('userBlock');
		}
		userBlockDisplayManage();
		return false;
	});

	displayUserBlocks();
}



function userBlockGetGridSize() {
	var table, size, tmp;

	size = parseInt($('.userBlock.create.form.size').val(), 10);

	if (isNaN(size) || size <= 0 || size >= 6) {
		aff_error_message('Entrez une valeur entre 1 et 5');
		return;
	}

	tmp = $('.userBlock.create.container > table');

	if (tmp.length != 0) {
		//Si la grille actuelle est de taille size
		if (tmp.get(0).classList.contains('c' + size)) {
			return;
		}
	}

	userBlockCreateGrid(size);

}

function userBlockCreateGrid(size) {
	/* Crée la grille pour créer des blocs */
	var table = createTable(size, size, {
		class: 'userBlock create grid'
	}, {}, {
		class: 'userBlock create cell'
	});

	$('.userBlock.create.container').empty().append(table);
}

function userBlockGetBlock() {
	
	/* Quand on valide la forme, on regarde si la forme possède
	 des bloc allumés, et si la forme déssinée existe
	 deja dans les formes utilisateurs */

	var oContainer = $('.userBlock.create.container > table'),
		oOn = $('.userBlock.create.cell.on');

	if (oContainer.length == 0 || oOn.length == 0) {
		return;
	}

	var aClass, tmp, i, aBuffer, nSize;
	aClass = [];
	aBuffer = [];

	//On chercher la taille du tableau
	tmp = oContainer.get(0).classList;
	tmp = tmp[tmp.length - 1];
	nSize = tmp.substr(1, tmp.length - 1);

	for (i = 0; i < oOn.length; i++) {
		tmp = oOn.get(i).classList;
		aClass.push([parseInt(tmp[tmp.length - 2].substring(1, 2), 10), parseInt(tmp[tmp.length - 3].substr(1, 2), 10)]);
	}

	for (i = 0; i < nSize * nSize; i++) {
		aBuffer[i] = 0;
	}
	for (i = 0; i < aClass.length; i++) {
		aBuffer[aClass[i][1] * nSize + aClass[i][0]] = 1;
	}

	addFormeToLocalStorage({
		forme: aBuffer,
		taille: nSize
	});

	$('.userBlock.create.cell.on').toggleClass('on');

}

function addFormeToLocalStorage(forme) {
	if (localStorage['userBlock'] == undefined) {
		userBlockinitLocalStorage();
	}

	if (userBlockFormeExistLocalStorage(forme)) {
		aff_error_message('Ce bloc existe déja')
		return;
	}

	var obj;
	obj = JSON.parse(localStorage['userBlock']);

	obj.push(forme);

	localStorage['userBlock'] = JSON.stringify(obj);

	aff_error_message('Votre forme a bien été ajoutée');
}

function userBlockFormeExistLocalStorage(block) {
	var userBlock = JSON.parse(localStorage['userBlock']),
		bExists = false,
		i = 0,
		j = 0;


	/* On fait une fonction caché pour ne pas polluer l'espace */
	var fnBlockEquals = function (block1, block2) {
		if (block1.taille != block2.taille) {
			return false;
		}
		for (i = 0; i < block1.forme.length; i++) {
			if (block1.forme[i] != block2.forme[i]) {
				return false;
			}
		}
		return true;
	};


	for (i = 0; i < userBlock.length; i++) {
		if (fnBlockEquals(userBlock[i], block)) {
			return true;
		}
	}

	return false;

}



function displayBlock(index, block) {
	
	/* Affiche les bloc utilisateurs */

	var container, div, table, button;

	container = $('.userBlock.manage.container');

	div = createElement('div', {
		class: 'userBlock manage display n' + index
	});

	table = createTable(block.taille, block.taille, {
		class: 'userBlock manage table n' + index
	}, {}, {
		class: 'userBlock manage cell n' + index
	});

	button = createElement('button', {
		class: 'userBlock manage delete n' + index
	}, 'Supprimer');
	$(button).hide();

	div.appendChild(table);
	div.appendChild(button);

	container.append($(div));

	container.on('mouseenter', '.userBlock.manage.display', function (e) {
		$(this).find('button').show();
	}).on('mouseleave', '.userBlock.manage.display', function (e) {
		$(this).find('button').hide();
	}).on('click', '.userBlock.manage.delete', function (e) {
		e.stopImmediatePropagation();
		var tmp, num, userBlock;
		tmp = e.target.classList;
		tmp = tmp[tmp.length - 1];
		num = tmp.substr(1, tmp.length - 1);

		userBlock = JSON.parse(localStorage['userBlock']);
		userBlock[num] = undefined;

		userBlock = userBlock.filter(function (a) {
			return (a != null);
		});

		if (userBlock.length == 0) {
			localStorage.removeItem('userBlock');
		} else {
			localStorage['userBlock'] = JSON.stringify(userBlock);
		}

		userBlockInitManage();

	});

	for (i = 0; i < block.taille; i++) {
		for (j = 0; j < block.taille; j++) {
			if (block.forme[(i * block.taille) + j] === 1) {
				$('.userBlock.manage.cell.n' + index + '.c' + i + '.l' + j).addClass('on');
			}
		}
	}
}

function displayUserBlocks() {
	var userBlock = JSON.parse(localStorage['userBlock']),
		i = 0;

	for (i = 0; i < userBlock.length; i++) {
		displayBlock(i, userBlock[i]);
	}
}
