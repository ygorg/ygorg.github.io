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

function cleanGrammar1(code, depthMax) {
  var depth = 0;
  var cleaned_code = "";
  for (var i = 0; i < code.length; i++) {
      var char = code.charAt(i);

      if (char === '[') {
        depth++;
      }
      if (depth < depthMax) {
        cleaned_code += char;
      }
      if (char === ']') {
        depth--;
      }
  }
  return cleaned_code;
}

function turtle(code) {
    resetMatrix();
    var angle = PI / 6;
    translate(width / 2, height);
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
        }
    }
}

function myLine(svg, x1, y1, x2, y2) {
  var line = document.createElementNS("http://www.w3.org/2000/svg",'line');
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.style.stroke = "rgb(255, 255, 255)";
  svg.insertBefore(line, svg.firstChild);
}
function myEllipse(svg, x, y, rx, ry) {
  var ellipse = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
  ellipse.setAttribute("cx", x);
  ellipse.setAttribute("cy", y);
  ellipse.setAttribute("rx", rx);
  ellipse.setAttribute("ry", ry);
  ellipse.style.fill = "#FFEA00";
  ellipse.style.stroke = "none";
  svg.append(ellipse);
}

function tran(parent, x, y) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  g.setAttribute("transform", "translate(" + x + "," + y + ")");
  parent.append(g);
  return g;
}
function rot(parent, angle) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  g.setAttribute("transform", "rotate(" + degrees(angle) + ")");
  parent.append(g);
  return g;
}
function scal(parent, sc) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  g.setAttribute("transform", "scale(" + sc + ")");
  parent.append(g);
  return g;
}


function svgTurtle(code, svgElement) {

    svgElement.innerHTML = "";

    var ct = [svgElement];
    var current_g = svgElement;
    //current_g = scal(current_g, 0.5);
    var angle = PI / 6;
    //current_g = tran(current_g, 200, 200);
    var len = 50;


    for (var i = 0; i < code.length; i++) {
        var char = code.charAt(i);

        switch (char) {
            case "F":
                myLine(current_g, 0, 0, 0, -len);
                current_g = tran(current_g, 0, -len);
                break;
            case "+":
                current_g = rot(current_g, angle);
                break;
            case "-":
                current_g = rot(current_g, -angle);
                break;
            case "[":
                ct.push(current_g);
                //current_g = scal(current_g, 1/3);
                len /= 2;
                break;
            case "]":
                myEllipse(current_g, 0, 0, 5, 5);
                current_g = ct.pop();
                len *= 2;
                break;
            default:
        }
    }
}

var svg;

function setup() {

    //var canvas = createCanvas(600, 600);
    //canvas.canvas.style.width = "";
    //canvas.canvas.style.height = "60vh";
    noCanvas();
    var p = createP("The generate button might not generate nothing for a while because there's a probability to generate something, so keep clicking.");
    var div = createP("");
    var generateButton = createButton("Generate").mousePressed(function() {
        current_sentence = generate(grammar1, current_sentence);
        var cleaned = cleanGrammar1(current_sentence, 5);
        current_sentence = cleaned;
        svgTurtle(current_sentence, svg);
    });
    generateButton.parent(div);
    var resetButton = createButton("Reset").mousePressed(function() {
        current_sentence = "";
        svg.innerHTML = "";
    });
    resetButton.parent(div);

    svg = document.getElementsByTagName("svg")[0];
    svg.style.width = "60vh";
    svg.style.height = "80vh";
}

/*function draw() {
    //background(130, 160, 120);
    stroke(255);
    //turtle(current_sentence);
}*/
