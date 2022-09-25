const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight; 
let faceColor;
let earColor;
const creatures = [];
const faceColors = [
    '#bfdc65',
    '#afc272',
    '#aebb83',
    '#abb880',
    '#89ba63',
    '#94ba77',
    '#94ae83',
    '#92ac82'
];

const earColors = [
    '#227876',
    '#48878a',
    '#648d8e',
    '#608888',
    '#1b324d',
    '#3f5364',
    '#3b4e5f',
    '#5e6976'
];
    
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    faceColor = color(210, 180, 140);
    earColor = color(145, 110, 69);
    // noLoop();
    c = initCreature();
    drawGrid();
    // console.log(c);
}

let counter = 0;
const prime = 757;
function draw() {
    // frameRate(4);
    clear();
    for(let i = 0; i < creatures.length; i++) {
        [x, y, size, c1, c2, speed, blink, closeCount] = creatures[i];
        // console.log(creatures[i]);
        x += speed;
        if (x - size > canvasWidth) {
            x = -size;
        }
        // close your eyes:
        if (x % prime == 0) {
            // console.log('on:', x, ":", prime);
            creatures[i] = [x, y, size, c1, c2, speed, true, closeCount];
        } else if (blink) {
            // open your eyes if they've been closed for 5 cycles:
            if(closeCount == 0) {
                creatures[i] = [x, y, size, c1, c2, speed, false, 5];  
            } else {
                --closeCount;
                creatures[i] = [x, y, size, c1, c2, speed, true, closeCount];
            }
        } else {
            // console.log('continuing:', x);
            creatures[i] = [x, y, size, c1, c2, speed, blink, closeCount];
        }
        makeCreature(x, y, size, c1, c2, blink, closeCount);
    }
    ++counter;
    drawGrid();
}

function initCreature() {
    const creature = makeCreature(canvasWidth / 2, canvasHeight / 2, 200, faceColor, earColor);
    creatures.push(creature);
    return creature;
}


function makeCreature(x, y, width, primaryColor, secondaryColor, blink=false, closeCount=5) { 
    // console.log(blink);
    // eye variables:
    const leftEyeX = x - width / 6;
    const rightEyeX = x + width / 6;
    const eyeY = y - width / 8;   
    const eyeWidth = width / 6; 
    const eyeHeight = (blink == true) ? 1 : width / 6;

    // ear variables:
    const leftEarX = x - width / 2.5;
    const rightEarX = x + width / 2.5;
    const earY = y - width / 2.5;   
    const earWidth = width / 2;

    // nose variables:
    const noseSize = width / 15;
    const x1 = x - noseSize;
    const x2 = x + noseSize;
    const x3 = x;
    const y1 = y + noseSize;
    const y2 = y1;
    const y3 = y1 + noseSize;

    // mouth variables:
    const cpX1Left = x - width/2.5;
    const cpX1Right = x + width/2.5;
    const cpY1 = y - width;
    const cpX2 = x1;
    const cpY2 = y2;
    const mouthTopX = x3;
    const mouthTopY = y3;
    const mouthBottomLeftX = x3 - width/5;
    const mouthBottomRightX = x3 + width/5;
    const mouthBottomY = y3 + width/6;

    const creature = [];
    // face circle
    fill(primaryColor);
    creature.push(circle(x, y, width));

    // ears
    fill(secondaryColor);
    creature.push(circle(leftEarX, earY, earWidth));
    creature.push(circle(rightEarX, earY, earWidth));

    // eyes
    fill(0);
    creature.push(ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight));
    creature.push(ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight));

    // nose
    stroke(0);
    strokeWeight(noseSize* 1.5);
    strokeJoin(ROUND);
    creature.push(triangle(x1, y1, x2, y2, x3, y3));
    strokeWeight(0);

    // mouth:
    strokeWeight(noseSize / 3);
    noFill();
    stroke(0);

    // left mouth curve
    creature.push(curve(
        cpX1Left, cpY1, // control point
        mouthTopX, mouthTopY,
        mouthBottomLeftX, mouthBottomY,
        cpX2, cpY2 // control point
    )); 

    // right mouth curve
    creature.push(curve(
        cpX1Right, cpY1, // control point
        mouthTopX, mouthTopY,
        mouthBottomRightX, mouthBottomY,
        cpX2, cpY2 // control point
    ));
    strokeWeight(1);
    const speed = Math.floor(Math.random() * 8) + 1;
    return [x, y, width, primaryColor, secondaryColor, speed, blink, closeCount];
}

function mousePressed() {
    const size = Math.floor(Math.random() * 250 + 50);
    const faceColor = faceColors[Math.floor(Math.random() * faceColors.length)];
    const earColor = earColors[Math.floor(Math.random() * earColors.length)];
    creatures.push(makeCreature(mouseX, mouseY, size, faceColor, earColor));
    drawGrid();
}