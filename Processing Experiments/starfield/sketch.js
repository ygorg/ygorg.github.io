var speed = 5;

function Star() {
  this.update = function() {
    this.pp_z = this.p_z;
    this.p_z = this.z;
    this.z -= speed;
    if (this.z < 1) {
      this.init();
    }
  };
  this.render = function() {
    var x_pos = map(this.x/this.z, 0, 1, 0, width);
    var y_pos = map(this.y/this.z, 0, 1, 0, height);
    var p_x_pos = map(this.x/this.pp_z, 0, 1, 0, width);
    var p_y_pos = map(this.y/this.pp_z, 0, 1, 0, height);
    var r = map(this.z, 0, width, 13, 0);
    ellipse(x_pos, y_pos, r);
    line(p_x_pos, p_y_pos, x_pos, y_pos);
  };
  this.init = function() {
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.z = random(width);
    this.p_z = this.z;
    this.pp_z = this.p_z;
  }
  this.init();
}

var stars = [];

function setup() {
    var canvas = createCanvas(600, 600);
    var div = createP("");
    var generateButton = createButton("Generate").mousePressed(function() {
        current_sentence = generate(grammar1, current_sentence);
    });
    generateButton.parent(div);
    var resetButton = createButton("Reset").mousePressed(function() {
        current_sentence = "";
    });
    resetButton.parent(div);
    canvas.canvas.style.width = "";
    canvas.canvas.style.height = "60vh";

    for(var i = 0; i < 300; i++) {
      stars.push(new Star());
    }
}

function draw() {
    if (mouseY > 0 && mouseY < height) {
      speed = map(mouseY, 0, height, 20, 0);
    }

    background(50, 20, 70);
    stroke(255);
    translate(width/2, height/2);
    for (var star of stars) {
      star.update();
      star.render();
    }
}
