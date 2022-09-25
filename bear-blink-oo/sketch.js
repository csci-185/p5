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
    makeCreature(canvasWidth / 2, canvasHeight / 2, 200, faceColor, earColor)
    drawGrid();
}

// let counter = 0;
function draw() {
    // frameRate(4);
    clear();
    // console.log(creatures);
    for (let i = creatures.length - 1; i >= 0; i--) {
        const creature = creatures[i];
        creature.moveRight(canvasWidth);
        creature.blink();
        creature.draw();
    }
    drawGrid();
}


function makeCreature(x, y, width, primaryColor, secondaryColor) { 
    const speed = Math.floor(Math.random() * 5) + 1;
    const bear = new Bear(x, y, width, speed, primaryColor, secondaryColor);
    creatures.unshift(bear);
}  

function mousePressed() {
    for (const creature of creatures) {
        if (creature.intersectsWith(mouseX, mouseY)) {
            creature.takeANap();
            return;
        }
    }
    // otherwise, create a new creature!
    const size = Math.floor(Math.random() * 250 + 50);
    const faceColor = faceColors[Math.floor(Math.random() * faceColors.length)];
    const earColor = earColors[Math.floor(Math.random() * earColors.length)];
    makeCreature(mouseX, mouseY, size, faceColor, earColor);
    drawGrid();
}