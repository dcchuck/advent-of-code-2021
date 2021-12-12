import * as fs from 'fs';
import * as assert from 'assert';

// const test1 = fs.readFileSync('./input/day11test1', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)))
// const test2 = fs.readFileSync('./input/day11test2', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)))
const input = fs.readFileSync('./input/day11', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)))

class SquidBoard {
    public board: number[][];
    public flashed: number[][];
    private flashedCount: number;

    constructor(board: number[][]) {
        this.board = board
        this.flashed = [];
        this.flashedCount = 0;
    }

    get
    howManyFlashes() {
        return this.flashedCount;
    }

    step() {
        this.flashed = [];

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                this.board[i][j] = this.board[i][j] + 1;
            }
        }

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] > 9 && this.isNotFlashed(i, j)) {
                    this.flash(i, j);
                }
            }
        }

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] > 9) {
                    this.board[i][j] = 0;
                }
            }
        }

        if (this.flashed.length === this.board.length * this.board[0].length) {
            throw Error(`ALL FLASHED`);
        }

        this.flashedCount += this.flashed.length;
    }

    flash(i: number, j: number) {
        this.flashed.push([i, j]);
        const topLeftD = [i - 1, j - 1];
        const top = [i - 1, j];
        const topRightD = [i - 1, j + 1];
        const right = [i, j - 1];
        const left = [i, j + 1];
        const bottomLeftD = [i + 1, j - 1];
        const bottom = [i + 1, j];
        const bottomRightD = [i + 1, j + 1];
        const positions = [topLeftD, top, topRightD, right, left, bottomLeftD, bottom, bottomRightD];

        for (let i = 0; i < positions.length; i++) {
           if (this.isInBounds(positions[i])) {
            this.board[positions[i][0]][positions[i][1]] = this.board[positions[i][0]][positions[i][1]] + 1;
            if (this.board[positions[i][0]][positions[i][1]] > 9 && this.isNotFlashed(positions[i][0], positions[i][1])) {
                this.flash(positions[i][0], positions[i][1]);
            }
           }
        }
    }

    isNotFlashed(i: number, j: number): boolean {
        return this.flashed.filter(f => f[0] === i && f[1] === j).length === 0;
    }

    isInBounds(position: number[]): boolean {
        return position[0] >= 0 && position[0] < this.board.length && position[1] >= 0 && position[1] < this.board[0].length
    }
}

const input2 = fs.readFileSync('./input/day11', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)))
const board = new SquidBoard(input2);

for (let i = 1; i <= 100; i++) {
    try {
        board.step();
    } catch (e) {
        console.error(e)
        console.log('Errored on step', i)
    }
}

console.log('Answer 1:', board.howManyFlashes);

const boardTwo = new SquidBoard(input);

let stepCount = 0;
while (true) {
    try {
        stepCount++;
        boardTwo.step();
    } catch (e) {
        console.log('Answer 2:', stepCount)
        break;
    }
}