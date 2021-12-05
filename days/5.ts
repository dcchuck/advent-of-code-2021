import * as fs from 'fs';

const input = fs.readFileSync('./input/day5', { encoding: 'utf-8' }).split('\n').map(e => e.split('->').map(e => e.trim())).map(e => e.map(f => f.split(',').map(e => parseInt(e))))

const BOARD_SIZE = 1000;
const trackingBoard = new Array(BOARD_SIZE)
for (let i = 0; i < trackingBoard.length; i++) {
    trackingBoard[i] = new Array(BOARD_SIZE).fill(0)
}

for (let i = 0; i < input.length; i++) {
    const [p1, p2] = input[i];
    if (p1[0] === p2[0]) {
        const traverse = [p1[1], p2[1]].sort((e,f) => e - f);
        for (let j = traverse[0]; j <= traverse[1]; j++) {
            trackingBoard[p1[0]][j] += 1;
        }
    }

    if (p1[1] === p2[1]) {
        const traverse = [p1[0], p2[0]].sort((e,f) => e - f);
        for (let j = traverse[0]; j <= traverse[1]; j++) {
            trackingBoard[j][p1[1]] += 1;
        }
    }
}

let count = 0;

for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        if (trackingBoard[i][j] > 1) {
            count++;
        }
    }
}

console.log('Answer 1:', count);

const trackingBoardTwo = new Array(BOARD_SIZE)
for (let i = 0; i < trackingBoardTwo.length; i++) {
    trackingBoardTwo[i] = new Array(BOARD_SIZE).fill(0)
}

for (let i = 0; i < input.length; i++) {
    const [p1, p2] = input[i];

    if (Math.abs(p1[0] - p2[0]) === Math.abs(p1[1] - p2[1])) {
        console.log(`DIAGONAL FOUND: ${p1}, ${p2}`);
        let startX = p1[0];
        let startY = p1[1];
        let finishX = p2[0];
        let finishY = p2[1];

        const xIncrement = startX > finishX ? -1 : 1;
        const yIncrement = startY > finishY ? -1 : 1;
        const length = Math.abs(startX - finishX);

        for (let j = 0; j <= length; j++) {
            trackingBoardTwo[startX][startY] += 1;
            startX += xIncrement;
            startY += yIncrement;
        }
    }

    if (p1[0] === p2[0]) {
        const traverse = [p1[1], p2[1]].sort((e,f) => e - f);
        for (let j = traverse[0]; j <= traverse[1]; j++) {
            trackingBoardTwo[p1[0]][j] += 1;
        }
    }

    if (p1[1] === p2[1]) {
        const traverse = [p1[0], p2[0]].sort((e,f) => e - f);
        for (let j = traverse[0]; j <= traverse[1]; j++) {
            trackingBoardTwo[j][p1[1]] += 1;
        }
    }
}

count = 0;

for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        if (trackingBoardTwo[i][j] > 1) {
            count++;
        }
    }
}

console.log('Answer 2:', count);