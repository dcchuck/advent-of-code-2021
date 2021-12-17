import * as fs from 'fs';

const input = fs.readFileSync('./input/day13test',{ encoding: 'utf-8' }).split('\n');
console.log(input)
const testPoints = input.slice(0, input.length - 3).map(e => e.split(',').map(f => parseInt(f)));
const testFoldRaw = input.slice(input.length - 2, input.length);

const getMax = (ps: number[][]) => ps.reduce((p, c) => [p[0] > c[0] ? p[0] : c[0], p[1] > c[1] ? p[1] : c[1]], [0, 0])


// console.log(getMax(points));


// let board = new Array(x + 1);
// .fill(new Array(y + 1).fill('.'))

// console.log('start board', board)
// for (let i = 0; i < board.length; i++) {
//     board[i] = new Array(y + 1).fill('.');
// }
// console.log('start board', board)

// for (let i = 0; i < points.length; i++) {
//     const [x, y] = points[i];
//     board[x][y] = '#';
// }

// console.log('start board', board)

// const folds = getFolds(foldInstruction);

// const xFold = (index: number) => {
//     for (let i = 0; i < index; i++) {
//         for (let j = 0; j < board[0].length; j++) {
//             if (board[i][j] === '#') {
//                 board[index + (index - i)][j] = '#';
//             }
//         }
//     }

//     board = board.slice(index + 1, board.length);
// // then I need to actually fold the data structure
// }

// const yFold = (index: number) => {
//     console.log('START BOARD', board)
//     for (let i = 0; i < board.length; i++) {
//     // for (let i = 0; i < 1; i++) {
//         for (let j = index + 1; j < board[0].length; j++) {
//             if (board[i][j] === '#') {
//                 console.log('Entry found at', i, j)
//                 board[i][board[0].length - 1 - j] = '#';
//             }
//         }
//     }

//     console.log('DONE BOARD', board)
//     for (let i = 0; i < board.length; i++) {
//         board[i] = board[i].slice(0, index)
//     }
//     console.log('NOW BOARD', board)
//     console.table(board)
// // then I need to actually fold the data structure
// }

// const processFold = (fold: string[]) => {
//     const [direction, index] = fold;

//     if (direction === 'x') {
//         xFold(parseInt(index));
//         console.log('post X fold', board)
//     }

//     if (direction === 'y') {
//         yFold(parseInt(index));
//         // console.log('post Y fold', board)
//     }
// }

// for (let i = 0; i < folds.length; i++) {
//     processFold(folds[i]);
// }

// console.table(board)

// let count = 0;

// for (let i = 0; i < board.length; i++) { 
//     for (let j = 0; j < board[0].length; j++) {
//         if (board[i][j] === '#') {
//             count++;
//         }
//     }
// }

// console.log('Answer One:', count);

const actualInput = fs.readFileSync('./input/day13', { encoding: 'utf-8' })
const [rawPoints, rawFolds] = actualInput.split('\n\n')
console.log(rawPoints)
console.log(rawFolds)

const getFolds = (instructions: string[]): string[][] => {
    const split = instructions.map(e => e.replace('fold along ', '')).map(e => e.split('='));

    return split;
}

const actualFolds = getFolds(rawFolds.split('\n'))
const actualPoints = rawPoints.split('\n').map(e => e.split(',').map(f => parseInt(f)));

class Board {
    board: string[][];
    folds: string[][];
    points: number[][];

    constructor(points: number[][], folds: string[][]) {
        this.folds = folds;
        this.points = points;
        this.board = this.createBoard(points);
    }

    get
    markedCount() {
        let counter = 0;
        
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] === '##') {
                    counter++
                }
            }
        }

        return counter;
    }

    fold() { 
        for (let i = 0; i < this.folds.length; i++) {
            this.processFold(this.folds[i]);
        }
    }

    processFold(fold: string[]) {
        const [direction, indexString] = fold;

        if (direction === 'x') {
            this.xFold(parseInt(indexString))
        }

        if (direction === 'y') {
            this.yFold(parseInt(indexString))
        }
    }

    xFold(index: number) {
        for (let i = 0; i < index; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] === '##') {
                    this.board[index + (index - i)][j] = '##';
                }
            }
        }

        this.board = this.board.slice(index + 1, this.board.length);
    }

    yFold(index: number) {
        for (let i = 0; i < this.board.length; i++) {
        // for (let i = 0; i < 1; i++) {
            for (let j = index + 1; j < this.board[0].length; j++) {
                if (this.board[i][j] === '##') {
                    this.board[i][this.board[0].length - 1 - j] = '##';
                }
            }
        }

        // console.log('DONE BOARD', this.board)
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = this.board[i].slice(0, index)
        }
        // console.log('NOW BOARD', this.board)
        // then I need to actually fold the data structure
    }
    
    createBoard(points: number[][]) {
        const [maxX, maxY] = getMax(points);
        const _board = new Array(maxX + 1)
        for (let i = 0; i < _board.length; i++) {
            _board[i] = new Array(maxY + 1).fill('')
        }

        for (let i = 0; i < this.points.length; i++) {
            const [x, y] = this.points[i];
            _board[x][y] = '##';
        }

        return _board;
    }
}

const testFolds = getFolds(testFoldRaw);
console.log(testPoints)
const testBoard  = new Board(testPoints, testFolds);

// console.table(testBoard.board)
// console.log(testBoard.markedCount)
testBoard.fold()
console.table(testBoard.board)
// console.log(testBoard.markedCount)
// testBoard.fold(2)
// console.table(testBoard.board)
// console.log(testBoard.markedCount)


const board = new Board(actualPoints, actualFolds)

// console.table(board.board)
console.log(board.markedCount)
board.fold()
console.log(board.markedCount)
// board.fold(1);
// console.log('Answer 1:', board.markedCount)
// console.table(board.board)
console.table(board.board)
