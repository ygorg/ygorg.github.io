function Drop() {

    this.init = function() {
        this.z_index = floor(random(0, 20));
        this.len = floor(map(this.z_index, 0, 20, 5, 10));
        this.x = random(-100, width);
        this.y = random(-50, -100);
        this.x_speed = 0;
        this.y_speed = map(this.z_index, 0, 20, 2, 8);
        this.x_acceleration = 0;
        this.y_acceleration = map(this.z_index, 0, 20, 0, 0.05);
    };
    this.update = function() {
        this.x_speed += this.x_acceleration;
        this.y_speed += this.y_acceleration;

        this.x += this.x_speed;
        this.y += this.y_speed;

        if (this.y > height || this.x > 2 * width || this.x < -2 * width) {
            this.init();
        }

    };
    this.render = function() {
        stroke(100, 100, 138);
        var aaa = sqrt(this.x_speed * this.x_speed + this.y_speed * this.y_speed);
        line(this.x, this.y, this.x + this.len * (this.x_speed / aaa), this.y + this.len * (this.y_speed / aaa));
    };
    this.init();
}

var drops = []

function setup() {

    var canvas = createCanvas(800, 600);
    canvas.style("height", "40%");
    canvas.style("width", "auto");

    for (var i = 0; i < 400; i++) {
        drops.push(new Drop());
    }
}

function wind(strength) {
    for (var drop of drops) {
        drop.x_acceleration = strength;
    }

}
var strength = 0;

function mouseMoved() {

    var diff = mouseX - pmouseX;
    if (diff < 0) {
        strength = -log(-diff) / 2;
    } else if (diff > 0) {
        strength = log(diff) / 2;
    } else {
        strength = 0;
    }

}

function draw() {

    background(230, 250, 230);
    wind(strength);
    for (var drop of drops) {
        drop.update();
        drop.render();
    }

}

//Violet
//background(230, 230, 250);
//stroke(138, 100, 100);

//Green
//background(230, 250, 230);
//stroke(100, 138, 100);
