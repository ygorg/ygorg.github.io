function Grammar1() {
    this.axiom = "F";
    this.rules = [{
        left: "F",
        right: "FF+[+F-F-F]-[-F+F+F]",
        probability: 0.2
    }];
}

/*function Grammar1() {
  this.axiom = "F";
  this.rules = [{left: "F", right: "FF+[+F-F-F]-[-F+F+F]"}];
}*/

var grammar1 = new Grammar1();
var current_sentence = "";

function generate(grammar, input) {

    if (!input) {
        return grammar.axiom;
    }

    var output = "";

    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        var found = false;

        for (var j = 0; j < grammar.rules.length; j++) {
            var rule = grammar.rules[j];
            if (char != rule.left ||
                (random(0, 1) > (rule.probability || 1))) {
                continue;
            }
            output += rule.right;
            found = true;
            break;
        }

        if (!found) {
            output += char;
        }

    }

    return output;

}

function turtle(code) {
    resetMatrix();
    var angle = PI/6;
    translate(width/2, height);
    var len = 50;

    for (var i = 0; i < code.length; i++) {
        var char = code.charAt(i);

        switch (char) {
            case "F":
                line(0, 0, 0, -len);
                translate(0, -len);
                break;
            case "+":
                rotate(angle);
                break;
            case "-":
                rotate(-angle);
                break;
            case "[":
                push();
                len /= 3;
                break;
            case "]":
                push();
                fill(255, 234, 0);
                noStroke();
                ellipse(0, 0, 10, 10);
                pop();
                pop();
                len *= 3;
                break;
            default:

        }

    }

}


function setup() {
    createCanvas(600, 600);
    var button = createButton("Generate");
    button.mousePressed(function() {
        current_sentence = generate(grammar1, current_sentence);
        //createP(current_sentence);
    });
    button = createButton("Reset");
    button.mousePressed(function() {
        current_sentence = "";
    });
}

function draw() {
    background(130, 160, 120);
    stroke(255);
    turtle(current_sentence);
}
