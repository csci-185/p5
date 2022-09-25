class Bear {
    static primeNumber = 509; //757;

    constructor(x, y, width, speed, primaryColor, secondaryColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
        this.isBlinking = false;
        this.blinkTimer = 5;
        this.numDraws = 0;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.draw();
    }

    moveRight(maxWidth) {
        this.x += this.speed;
        if ((this.x - this.width) > maxWidth) {
            this.x = -this.width;
        }
        ++this.numDraws;
    }

    intersectsWith(x, y) {
        // calculate euclidian distance:
        let xDist = this.x - x;
        let yDist = this.y - y;
        let distance = Math.sqrt( xDist ** 2 + yDist ** 2 );
        
        let radius = this.width / 2;
        if (distance < radius) {
            return true;
        }
        return false;
    }

    takeANap() {
        this.isBlinking = true;
        this.blinkTimer = 300;
    }

    blink() {
        // blink every primeNumber cycles:
        if ((this.x + this.numDraws) % Bear.primeNumber == 0) {
            this.isBlinking = true;
        } else if (this.isBlinking) {
            // open your eyes if they've been closed for 5 cycles:
            if(this.blinkTimer == 0) {
                this.blinkTimer = 5;
                this.isBlinking = false;
            } else {
                --this.blinkTimer;
            }
        }
    }

    draw() {
        const leftEyeX = this.x - this.width / 6;
        const rightEyeX = this.x + this.width / 6;
        const eyeY = this.y - this.width / 8;
        const eyeWidth = this.width / 6;
        const eyeHeight = (this.isBlinking == true) ? this.width / 60 : this.width / 6;

        // ear variables:
        const leftEarX = this.x - this.width / 2.5;
        const rightEarX = this.x + this.width / 2.5;
        const earY = this.y - this.width / 2.5;
        const earWidth = this.width / 2;

        // nose variables:
        const noseSize = this.width / 15;
        const x1 = this.x - noseSize;
        const x2 = this.x + noseSize;
        const x3 = this.x;
        const y1 = this.y + noseSize;
        const y2 = y1;
        const y3 = y1 + noseSize;

        // mouth variables:
        const cpX1Left = this.x - this.width / 2.5;
        const cpX1Right = this.x + this.width / 2.5;
        const cpY1 = this.y - this.width;
        const cpX2 = x1;
        const cpY2 = y2;
        const mouthTopX = x3;
        const mouthTopY = y3;
        const mouthBottomLeftX = x3 - this.width / 5;
        const mouthBottomRightX = x3 + this.width / 5;
        const mouthBottomY = y3 + this.width / 6;

        // face circle
        fill(this.primaryColor);
        circle(this.x, this.y, this.width);

        // ears
        fill(this.secondaryColor);
        circle(leftEarX, earY, earWidth);
        circle(rightEarX, earY, earWidth);

        // eyes
        fill(0);
        ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight);
        ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight);

        // nose
        stroke(0);
        strokeWeight(noseSize * 1.5);
        strokeJoin(ROUND);
        triangle(x1, y1, x2, y2, x3, y3);
        strokeWeight(0);

        // mouth:
        strokeWeight(noseSize / 3);
        noFill();
        stroke(0);

        // left mouth curve
        curve(
            cpX1Left, cpY1,
            mouthTopX, mouthTopY,
            mouthBottomLeftX, mouthBottomY,
            cpX2, cpY2 // control point
        );

        // right mouth curve
        curve(
            cpX1Right, cpY1,
            mouthTopX, mouthTopY,
            mouthBottomRightX, mouthBottomY,
            cpX2, cpY2 // control point
        );
        strokeWeight(1);
    }
}