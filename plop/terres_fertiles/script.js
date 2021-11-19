// ZeRemz#0434 (édité par ra1nbowpill#7214)

const originRow = document.getElementById('originCoordX');
const originCol = document.getElementById('originCoordY');

/* ---------- */
/*    GUI     */
/* ---------- */

const spinner = document.body.getElementsByClassName('loading')[0];
function showSpinner() {
	spinner.classList.remove('hidden');
}

function hideSpinner() {
	spinner.classList.add('hidden');
}

const completionRateValue = document.body.getElementsByClassName('completionRateValue')[0];
	function setCompletionRate(value) {
		completionRateValue.innerText = (100 * value).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function getClassValue (element, prefix) {
	for(const c of element.classList) {
		if(c.startsWith(prefix)) {
			return parseInt(c.substring(prefix.length), 10);
		}
	}
}

function getRow(element) {
	return getClassValue(element, 'row');
}

function getCol(element) {
	return getClassValue(element, 'col');
}


var msg_timer = null;
function display_copied_msg(x, y) {
	let msg_div = document.getElementById('copied_msg');
	msg_div.style.left = x + 'px';
	msg_div.style.top = y + 'px';
	msg_div.classList.remove('fade');
	if (msg_timer) {
		clearTimeout(msg_timer);
		msg_timer = null;
	}
	msg_timer = setTimeout(function() {
	   msg_div.classList.add('fade');
	   msg_timer = null;
	}, 500);
}

function copyToClipboard(e) {
	navigator.clipboard.writeText(e.currentTarget.getElementsByClassName('color')[0].innerText);
	display_copied_msg(e.x, e.y);
}

function construct_table(img_color) {
	const minCol = parseInt(originCol.value), minRow = parseInt(originRow.value);
	var table = document.getElementById('image_table');
	table.innerHTML = '';
	var row = null, cell = null;
	for (var i = 0; i < img_color.length; i++) {
		row = document.createElement('tr')
		for (var j = 0; j < img_color[i].length; j++) {
			cell = document.createElement('td');

			cell.innerHTML = `${minCol + j}:${minRow + i} <span class="color">${img_color[i][j].substring(1)}</span>`;
			cell.style.background = img_color[i][j];
			if (j % 10 === 0) {
				cell.classList.add('edge-left');
			} else if ((j + 1) % 10 === 0) {
				cell.classList.add('edge-right');
			}
			if (i % 10 === 0) {
				cell.classList.add('edge-top');
			} else if ((i + 1) % 10 === 0) {
				cell.classList.add('edge-bottom');
			}
			cell.classList.add(`row${i}`);
			cell.classList.add(`col${j}`);
			cell.onclick = copyToClipboard;
			row.appendChild(cell);
		}
		table.appendChild(row)
	}
}

/* ---------------- */
/* Image processing */
/* ---------------- */

/* From https://joeetuso.medium.com/javascript-algorithms-convert-rgb-to-hex-79772e554914 */
function decToHex(value) {
	if (value > 255) {
		return 'FF';
	} else if (value < 0) {
		return '00';
	} else {
		return value.toString(16).padStart(2, '0').toUpperCase();
	}
}

function rgbToHex(r, g, b) {
	return decToHex(r) + decToHex(g) + decToHex(b);
}

function hexToRGB (hex) {
	let r = 0, g = 0, b = 0;
	// handling 3 digit hex
	if(hex.length == 4){
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];
		// handling 6 digit hex
	}else if (hex.length == 7){

		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	};

	return [+r, +g, +b];
}

const colorThresholdInput = document.getElementById('colorThresholdInput');
function isSameColor(currentColor, myColor) {
	const a = hexToRGB(currentColor);
	const b = hexToRGB(myColor);
	let diff = 0;
	for (var i = 0; i < a.length; i++) {
		diff += Math.abs(a[i] - b[i]);
	}
	return diff < colorThresholdInput.value;
}

function minMaxRowCol() {
	/* Find out the min and max floag coordinates of displayed table */
	const allCells = document.getElementById("image_table").getElementsByTagName('td');
	let row = parseInt(allCells[0].innerText.split(' ')[0].split(':')[0]);
	let col = parseInt(allCells[0].innerText.split(' ')[0].split(':')[1]);
	var min_r = row, max_r = row;
	var min_c = col, max_c = col;
	var r, c;
	for (var i = 1; i < allCells.length; i++) {
		r = parseInt(allCells[i].innerText.split(' ')[0].split(':')[0]);;
		c = parseInt(allCells[i].innerText.split(' ')[0].split(':')[1]);
		min_r = Math.min(r, min_r);
		max_r = Math.max(r, max_r);
		min_c = Math.min(c, min_c);
		max_c = Math.max(c, max_c);
	}
	return [min_r, max_r, min_c, max_c];
}

function imageToPixelTable(img) {
	/* Convert an <img> to a RGB pixel matrix */
	const canvas = document.createElement('canvas');
	canvas.style.display = 'none';
	document.body.appendChild(canvas);
	const ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	const imgd = ctx.getImageData(0, 0, img.width, img.height).data;
	console.log(imgd);
	var pixels = [], acc = null;
	for (var i = 0; i < img.height; i++) {
		acc = [];
		for (var j = 0; j < img.width; j++) {
			var idx = (i * img.width + j) * 4;
			var tmp = '#' + rgbToHex(imgd[idx], imgd[idx+1], imgd[idx+2])
			acc.push(tmp);
		}
		pixels.push(acc);
	}
	document.body.removeChild(canvas)
	return pixels;
}

/* ------------------ */
/* Comaprison to flag */
/* ------------------ */


function processCell(cell, allPixels) {
	/* If cell is different from corresponding pixel in allPixel
	Display it in emphase because it needs editing */
	const row = getRow(cell);
	const col = getCol(cell);
	const x = parseInt(originCol.value) + col;
	const y = parseInt(originRow.value) + row;
	
	const currentPixel = allPixels.find(px => px.x === x && px.y === y);
	if(!currentPixel) {
		console.error(`Could not find pixel at row ${row}, col ${col} (${x}, ${y})`);
		return;
	}
	
	const currentColor = currentPixel.hexColor.toLowerCase();
	const referenceColor = '#' + cell.textContent.split(' ')[1].toLowerCase();
	const isSame = isSameColor(referenceColor, currentColor);
	if (isSame) {
		cell.classList.remove('incorrect');
	}
	else {
		cell.classList.add('incorrect');
	}

	return isSame;
}

function onRequestSuccess(request) {
	const allPixels = JSON.parse(request.responseText);
	const allCells = document.getElementById("image_table").getElementsByTagName('td');

	let nbCorrect = 0;
	let nbTotal = 0;
	for (const cell of allCells) {
		if (processCell(cell, allPixels)) {
			nbCorrect++;
		}
		nbTotal++;
	}

	setCompletionRate(nbCorrect / nbTotal);

	console.log('refresh complete');
	hideSpinner();
}

function makeRequest() {
	const request = new XMLHttpRequest();
	// for each cell get row/col and min/max
	const [minCol, maxCol, minRow, maxRow] = minMaxRowCol();
	const requestUrl = `https://api.codati.ovh/pixels/zone/?minx=${minCol}&miny=${minRow}&maxx=${maxCol}&maxy=${maxRow}`;
	request.open('get', requestUrl, true);
	request.onload = () => onRequestSuccess(request);
	request.onerror = () => {
		console.error(`Failed to fetch current pixel values: received ${request.status} status, ${request.responseText}`);
		hideSpinner();
		console.log(request);
	}

	return request;
};

function refreshPixels() {
	showSpinner();
	console.log('refreshing, please wait...');
	const request = makeRequest();
	request.send();
	console.log('refresh complete');
}


// We should wait until the image is loaded
document.body.onload = function() {
	var img = document.getElementById('sourceImg')
	var pixels = imageToPixelTable(img)
	construct_table(pixels);
};