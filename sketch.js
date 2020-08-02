let dont_update_after = 3600;
let frame_cnt = 0
function setup() {
    var tooltip = new Drooltip({ 
        "element": ".myTooltip",
        "position": "bottom",
        "background": "#262221",
        "color": "#f5f5f5",
        "animation": "material"
    });
    createCanvas(window.innerWidth, window.innerHeight);
    background("#3661b0");
    boxes = new AngleBox(window.innerWidth / 20, window.innerHeight/20, 20)
    boxes.updateAngle()
    // boxes.drawAngle()
    boxes.intializeFloatPoint(50)
    console.log(width, height)
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background("#3661b0");
    boxes = new AngleBox(window.innerWidth / 20, window.innerHeight / 20, 20)
    boxes.updateAngle()
    // boxes.drawAngle()
    boxes.intializeFloatPoint(500)
}

function draw() {
    // background(220)
    // boxes.drawGraph()
    // boxes.drawAngle()
    if(dont_update_after > frame_cnt){
        boxes.updateAngle()
        boxes.floatInGrid()
    }
    frame_cnt ++;
}

class AngleBox {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.offsetZ = 0;
        this.angles = [];
        this.floatPoints = [];
        for (var i = 0; i < x; i++) {
            this.angles[i] = [];
            for (var j = 0; j < y; j++) {
                this.angles[i][j] = random() * 180
                this.angles[i][j] = random() * 0
            }
        }
    }

    drawGraph() {
        strokeWeight(0.5)
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                rect(i * this.size, j * this.size, this.size, this.size)
            }
        }
    }

    drawAngle() {
        strokeWeight(0.5)
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                push()
                translate(i * this.size + (this.size / 2), j * this.size + (this.size / 2))
                rotate(this.angles[i][j])
                line(this.size * 0.4, 0, -this.size * 0.4, 0)
                circle(this.size * 0.4, 0, 2)
                pop();
            }
        }
    }

    updateAngle() {
        angleMode(DEGREES);
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                this.angles[i][j] = noise(i / (this.size * 0.6), j / (this.size * 0.6), this.offsetZ) * 4 * 180;
            }
        }
        this.offsetZ += 0.01

    }

    intializeFloatPoint(number_of_points) {
        for (var i = 0; i < number_of_points; i++) {
            this.floatPoints[i] = createVector(random() * this.x * this.size, random() * this.x * this.size);
        }
    }

    floatInGrid() {
        for (var points in this.floatPoints) {
            if (this.floatPoints[points].x < 0) {
                this.floatPoints[points].x = this.x * this.size;
                this.floatPoints[points].x--;
            }
            if (this.floatPoints[points].y < 0) {
                this.floatPoints[points].y = this.y * this.size;
                this.floatPoints[points].y--;
            }
            if (this.floatPoints[points].x > this.x * this.size) {
                // this. floatPoints[points]. x = random() * this. x * this. size
                // this. floatPoints[points]. x--; 
                this.floatPoints[points].x = 0;
            }
            if (this.floatPoints[points].y > this.y * this.size) {
                // this. floatPoints[points]. y = random() * this. x * this. size
                // this. floatPoints[points]. y--; 
                this.floatPoints[points].y = 0;
            }
            var x_pos = this.floatPoints[points].x;
            var y_pos = this.floatPoints[points].y;
            var angle = this.angles[floor(x_pos / this.size)][floor(y_pos / this.size)];
            this.floatPoints[points] = applyForce(this.floatPoints[points], angle, random() * 20)
            // strokeWeight(0)
            // point(x_pos , y_pos)
            stroke("rgba(245, 245, 245,0.8)")
            strokeWeight(0.1)
            line(x_pos, y_pos, this.floatPoints[points].x, this.floatPoints[points].y)
        }
    }
}

function applyForce(vector, angle, force) {
    angleMode(DEGREES);
    vector.x += force * cos(angle);
    vector.y += force * sin(angle);
    return vector;
}