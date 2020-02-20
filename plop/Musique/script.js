var demi_ton = {
    Db: 17.323,
    Eb: 19.445,
    Gb: 23.124,
    Ab: 25.956,
    Bb: 29.135,
};

var ton = {
    C: 16.351,
    D: 18.354,
    E: 20.601,
    F: 21.826,
    G: 24.499,
    A: 27.5,
    B: 30.86
};

var note = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];



function rand(min, max) {
    'use strict';
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    'use strict';
    return parseInt(Math.random() * (max - min), 10) + min;
}

function bernoulli() {
    'use strict';
    return Math.random() >= 0.5;
}

function onde(i, freq, sampleRate) {
    'use strict';
    //Renvoie un point de la courbe du son
    return 128 + (Math.round(127 * Math.sin(2 * Math.PI * i / sampleRate * freq)));

}

function sonPur(freq, sampleRate, length, tab) {
    'use strict';
    //Ajoute un son pur de longueur length,
    //de frequence freq et d'échantillonnage sampleRate
    //au tableau tab
    var i;
    for (i = 0; i < parseInt(sampleRate * length, 10); i = i + 1) {

        tab.push(onde(i, freq, sampleRate));

    }
}

function sonComplexe(freq, harmonique, sampleRate, length, tab) {
    'use strict';
    //Ajoute un son pur de longueur length,
    //de frequence freq et d'échantillonnage sampleRate
    //complexifié avec les harmoniques
    //[numero de l'harmonique, intensitée de l'harmonique]
    //au tableau tab
    var i, j, val;

    for (i = 0; i < parseInt(sampleRate * length, 10); i = i + 1) {
        //val = onde(i, freq, sampleRate);
        val = 0;
        for (j = 0; j < harmonique.length; j = j + 1) {
            val += onde(i, harmonique[j].rang * freq, sampleRate) * harmonique[j].intensite;
        }
        tab.push(val);
    }

}

function playThatShit(data) {
    'use strict';
    var audio, wave;

    audio = $('.play')[0];
    wave = new RIFFWAVE(); // create an empty wave file

    wave.header.sampleRate = 8000;

    wave.Make(data); // make the wave file
    audio.src = wave.dataURI;
    audio.play();
}

var freq = 440,
    harmonique = [],
    duree = 1;

function dispParametres() {
    'use strict';
    var i, dispHarmonique;
    dispHarmonique = '';
    for (i = 0; i < harmonique.length; i++) {
        dispHarmonique += harmonique[i].rang + '(' + parseInt(harmonique[i].intensite * 100, 10) / 100 + ')' + ' ';
    }

    $('.frequence').text(freq);
    $('.harmonique').text(dispHarmonique);
    $('.duree').text(duree);
}

function createSound(options) {
    'use strict';
    var data = [],
        i = 0,
        tmp = 0,
        intensitee = 0,
        intensiteeTotale = 0;
    harmonique.length = 0;

    if (!options) {
        options = {
            useTone: true,
            plageOctave: {
                min: 1,
                max: 12
            },
            aleatFrequence: true,
            frequence: 440,
            plageFrequence: {
                min: 100,
                max: 1000
            },
            aleatHarmonique: false,
            tabHarmonique: [2, 3, 5, 7],
            aleatDuree: false,
            duree: 1,
            plageDuree: {
                min: 0,
                max: 2
            }
        };
    }


    if (options.useTone) {
        freq = ton[note[randInt(0, note.length)]] * Math.pow(2, randInt(options.plageOctave.min, options.plageOctave.max));
    } else if (options.aleatFrequence) {
        freq = rand(options.plageFrequence.min, options.plageFrequence.max);
    } else {
        freq = options.frequence;
    }

    if (options.aleatDuree) {
        duree = rand(options.plageDuree.min, options.plageDuree.max);
    } else {
        duree = options.duree;
    }

    if (options.aleatHarmonique === true) {

        harmonique.push({
            rang: 1,
            intensite: 100
        });
        intensiteeTotale = 100;
        while (tmp < 60) {
            tmp += randInt(1, 20);
            intensitee = randInt(0, 100);
            intensiteeTotale += intensitee;
            harmonique.push({
                rang: tmp,
                intensite: intensitee
            });
        }
        //La puissance de chaque harmonique est equivalente
        for (i = 0; i < harmonique.length; i = i + 1) {
            harmonique[i].intensite /= intensiteeTotale;
        }
        console.log(harmonique);


        sonComplexe(freq, harmonique, 8000, duree, data);

    } else {

        if (options.tabHarmonique.length !== 0) {
            harmonique.push({
                rang: 1,
                intensite: 100
            });
            intensiteeTotale = 100;
            for (i = 0; i < options.tabHarmonique.length; i++) {
                if (options.tabHarmonique[i] == 1) {
                    continue;
                }
                intensitee = randInt(0, 100);
                intensiteeTotale += intensitee;
                harmonique.push({
                    rang: options.tabHarmonique[i],
                    intensite: intensitee
                });
            }
            for (i = 0; i < harmonique.length; i = i + 1) {
                harmonique[i].intensite /= intensiteeTotale;
            }
            sonComplexe(freq, harmonique, 8000, duree, data);
        } else {
            sonPur(freq, 8000, duree, data);
        }
    }
    return data;

}

function init() {
    'use strict';
    var audio, wave, data, i, freq = 523,
        tab = [];

    initOptions();
    initGUI();

    $(window).on('keypress', function (e) {
        //Si on appuie sur la barre d'espace on fait play/pause
        if (e.which === 32) {
            audio = $('.play')[0];
            if (audio.duration > 0 && !audio.paused) {
                audio.pause();
            } else {
                audio.play();
            }
        }

    });

    $('.play').on('ended', function (e) {
        //Des qu'un son se fini on en cree un autre
        var data = createSound(options);
        dispSine(data);
        playThatShit(data);
        dispParametres();
    }).trigger('ended');
}
