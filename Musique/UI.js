var options = {
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

function dispSine(data) {
    ctx.clearRect(0, 0, 1000, 300);

    /*for (i = 0; i < 1000; i++) {
        ctx.fillRect(i, data[i], 5, 5);
    }*/

    ctx.beginPath();
    ctx.moveTo(0, data[0]);
    for (i = 0; i < 500; i++) {
        ctx.lineTo(i, data[i]);
    }
    ctx.stroke();

}

function initGUI() {

    ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green';

}

function initOptions() {
    'use strict';

    var input = ['optRandomFreq', 'optRandomFreqMin', 'optRandomFreqMax', 'optFreq', 'optRandomHarmonique', 'optDefineHarmonique', 'optRandomDuration', 'optRandomDurationMin', 'optRandomDurationMax', 'optDuration'];

    $('#optUseTone').val(options.useTone);
    $('#optOctaveMin').val(options.plageOctave.min);
    $('#optOctaveMax').val(options.plageOctave.max);

    $('#optFreq').val(options.frequence);
    $('#optRandomFreqMin').val(options.plageFrequence.min);
    $('#optRandomFreqMax').val(options.plageFrequence.max);

    $('#optDefineHarmonique').val(options.tabHarmonique.join(' '));

    $('#optDuration').val(options.duree);
    $('#optRandomDurationMin').val(options.plageDuree.min);
    $('#optRandomDurationMax').val(options.plageDuree.max);


    $('#optUseTone').on('change', function (e) {
        options.useTone = $(this).prop('checked');
    });
    $('#optOctaveMin').on('input', function (e) {
        options.plageOctave.min = parseInt($(this).val(), 10);
    });
    $('#optOctaveMax').on('input', function (e) {
        options.plageOctave.max = parseInt($(this).val(), 10);
    });


    $('label[for="optRandomFreqMin"],label[for="optRandomFreqMax"]').toggle();

    $('#optRandomFreq').on('change', function (e) {
        options.aleatFrequence = $(this).prop('checked');
        $('#optRandomFreqMin,#optRandomFreqMax,#optFreq').toggle();
        $('label[for="optRandomFreqMin"],label[for="optRandomFreqMax"],label[for="optFreq"]').toggle();
    });
    $('#optRandomFreqMin').toggle().on('input', function (e) {
        options.plageFrequence.min = parseInt($(this).val(), 10);
    });
    $('#optRandomFreqMax').toggle().on('input', function (e) {
        options.plageFrequence.max = parseInt($(this).val(), 10);
    });
    $('#optFreq').on('input', function (e) {
        options.frequence = $(this).val();
    });



    $('#optRandomHarmonique').on('change', function (e) {
        options.aleatHarmonique = $(this).prop('checked');
        $('#optDefineHarmonique').toggle();
        $('label[for="optDefineHarmonique"]').toggle();
    });
    $('#optDefineHarmonique').on('input', function (e) {
        options.tabHarmonique = $(this).val().split(' ');
    });



    $('label[for="optRandomDurationMin"],label[for="optRandomDurationMax"]').toggle();

    $('#optRandomDuration').on('change', function (e) {
        options.aleatDuree = $(this).prop('checked');
        $('#optRandomDurationMin,#optRandomDurationMax,#optDuration').toggle();
        $('label[for="optRandomDurationMin"],label[for="optRandomDurationMax"],label[for="optDuration"]').toggle();
    });
    $('#optRandomDurationMin').toggle().on('input', function (e) {
        options.plageDuree.min = parseInt($(this).val(), 10);
    });
    $('#optRandomDurationMax').toggle().on('input', function (e) {
        options.plageDuree.max = parseInt($(this).val(), 10);
    });
    $('#optDuration').on('input', function (e) {
        options.duree = parseInt($(this).val(), 10);
    });


    $('#optRandomFreq').trigger('click');

}
