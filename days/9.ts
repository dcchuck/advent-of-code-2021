import * as fs from 'fs';

// const input = fs.readFileSync('./input/day9test', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)));
const input = fs.readFileSync('./input/day9', { encoding: 'utf-8' }).split('\n').map(e => e.split('').map(e => parseInt(e)));

class SmokeBasin {
    input: any;
    lowPoints: any;

    constructor(inp: any) {
        this.input = inp;
        this.lowPoints = [];
    }

    totalRiskLevel() {
        if (this.lowPoints.length === 0) {
            this.findLowPoints();
        }

        let risk = 0;

        for (let i = 0; i < this.lowPoints.length; i++) {
            risk += input[this.lowPoints[i][0]][this.lowPoints[i][1]] + 1;
        }

        return risk;
    }

    findLowPoints() {
        for (let i = 0; i < this.input.length; i++) {
            for (let j = 0; j < this.input[0].length; j++) {
                if (this.isLowPoint(i, j)) {
                    this.lowPoints.push([i, j]);
                }
            }
        }
    }

    isLowPoint(i: number, j: number) {
        // top left corner
        if (i === 0 && j === 0) {
            const val =  this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i][j+1];
            return val;
        }

        // top right corner
        if (i === 0 && j === this.input[0].length - 1) {
            const val = this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i][j-1];
            return val;
        }

        // bottom right corner
        if (i === this.input.length - 1 && j === this.input[0].length - 1) {
            const val =  this.input[i][j] < this.input[i - 1][j] && this.input[i][j] < this.input[i][j-1];
            return val;
        }

        // bottom left corner
        if (j === 0 && i === this.input.length - 1) {
            const val = this.input[i][j] < this.input[i-1][j] && this.input[i][j] < this.input[i][j+1];
            return val;
        }

        if (i === 0) {
            // rest of the first row
            return this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i][j+1] && this.input[i][j] < this.input[i][j - 1]
        }

        if (j === 0) {
            // rest of the first column
            return this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i][j+1] && this.input[i][j] < this.input[i - 1][j]
        }

        if (i === this.input.length - 1) {
            // rest of the bottom row
            return this.input[i][j] < this.input[i-1][j] && this.input[i][j] < this.input[i][j+1] && this.input[i][j] < this.input[i][j - 1]
        }

        if (j === this.input[0].length - 1) {
            // rest of the last columns
            return this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i][j-1] && this.input[i][j] < this.input[i - 1][j]
        }

        return this.input[i][j] < this.input[i+1][j] && this.input[i][j] < this.input[i-1][j] && this.input[i][j] < this.input[i][j + 1] && this.input[i][j] < this.input[i][j-1];
    }

    getBasinMath() {
        if (this.lowPoints.length === 0) {
            this.findLowPoints();
        }

        return 500;
    }
}

const partOne = new SmokeBasin(input)
console.log('Answer 1:', partOne.totalRiskLevel())

const partTwo = new SmokeBasin(input)
partTwo.findLowPoints();
console.log('Answer 2:', partTwo.getBasinMath())