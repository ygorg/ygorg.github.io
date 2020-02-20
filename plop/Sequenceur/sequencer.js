/*global $:true, RIFFWAVE:true */
/*jslint plusplus:true */

var seq_nbInstru, seq_column, seq_loop, seq_indice;
var color_tab = ['orangered', 'palegreen', 'deepskyblue', 'yellow', 'cadetblue', 'dodgerblue'];

function seq_clear() {
    'use strict';
    $('#instruments td.on').click();
}

function seq_save() {
    'use strict';
    localStorage[0] = '';
    $('#instruments .on').each(function (index, node) {
        var tmp;
        tmp = (localStorage[0] !== '') ? ' ' : '';
        localStorage[0] += tmp + '.' + node.classList[0] + '.' + node.classList[1];
    });
}

function seq_load() {
    'use strict';
    var tmp, i;
    seq_clear();
    tmp = localStorage[0].split(' ');
    for (i = 0; i < tmp.length; i++) {
        $(tmp[i]).click();
    }

}

function seq_dispPlaying(ind) {
    'use strict';
    $('#instruments td').removeClass('playing');
    $('#instruments .c' + ind).addClass('playing');
}

function seq_play(ind) {
    'use strict';
    seq_dispPlaying(ind);
    //$('#instruments td.on.playing audio').trigger('play');
    $('#instruments td.on.playing audio').each(function (index, node) {
        node.play();
    });
}

function seq_read(ind) {
    'use strict';
    seq_play(ind);
    seq_loop = setTimeout(function () {
        seq_read((ind + 1) % 16);
    }, 200);
}

function seq_addInstr(src, type) {
    'use strict';
    var i;
    $('#instruments').append($('<tr>').addClass('row' + seq_nbInstru));
    for (i = 0; i < seq_column; i++) {
        $('#instruments tr.row' + seq_nbInstru).append($('<td>').addClass('c' + i).addClass('l' + seq_nbInstru));
    }

    $('#instruments td.l' + seq_nbInstru).append($('<audio>').attr('autobuffer', ''));
    $('#instruments td.l' + seq_nbInstru + ' audio').append($('<source>').each(function (index, node) {
        node.src = src;
    }).attr('type', 'audio/' + type)).each(function (index, node) {
        node.load();
    });

    //$('#instruments td.l' + seq_nbInstru).css('background-color', 'lightgrey');

    $('#instruments td.l' + seq_nbInstru).on('click', function (event) {
        $(this).toggleClass('on');
        var tmp;
        if ($(this).hasClass('on')) {
            tmp = $(this).parent()[0].classList[0].substr(3, 1);
            $(this).css('background-color', color_tab[tmp % color_tab.length]);
        } else {
            $(this).css('background-color', 'lightgrey');
        }
    }).css('background-color', 'lightgrey');

    seq_nbInstru++;
}

function audio_createSound(freq) {
    'use strict';
    var data, i, wave;
    data = [];
    for (i = 0; i < 1600; i++) {
        data[i] = 128 + Math.round(127 * Math.sin(2 * Math.PI * i / 8000 * freq));
    }
    wave = new RIFFWAVE(data);
    seq_addInstr(wave.dataURI, 'wav');

}

function init() {
    'use strict';

    seq_nbInstru = 0;
    seq_column = 16;
    seq_indice = 0;

    seq_addInstr('sounds/hho.wav', 'wav');
    seq_addInstr('sounds/hhc.wav', 'wav');
    seq_addInstr('sounds/snare.wav', 'wav');
    seq_addInstr('sounds/bass.wav', 'wav');

    $('#seq_toggleRead').on('click', function () {
        if (seq_loop === undefined) {
            seq_loop = setInterval(function () {
                seq_play(seq_indice);
                seq_indice = (seq_indice + 1) % seq_column;
            }, 200);
            $(this)[0].value = '||';
        } else {
            clearInterval(seq_loop);
            seq_loop = undefined;
            $(this)[0].value = '>';
        }
    });

    $('#seq_valideFreq').on('click', function () {
        var freq;
        freq = parseInt($('#seq_chooseFreq').val(), 10);
        $('#seq_chooseFreq').val('');
        if (freq < 0 || isNaN(freq)) {
            return false;
        } else {
            audio_createSound(freq);
        }
    });
}
