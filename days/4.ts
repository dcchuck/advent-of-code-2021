import * as assert from 'assert';
import * as fs from 'fs';

class BingoBoard {
    public board: number[][];
    public marked: boolean[][];

    constructor(board: number[][]) {
        this.board = board;
        this.marked = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ]
    }

    markSquare(selection: number) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] === selection) {
                    this.marked[i][j] = true;
                }
            }
        }
    }

    get
    unmarkedScore() {
        let unmarked = 0;

        for (let i = 0; i < this.marked.length; i++) {
            for (let j = 0; j < this.marked.length; j++) {
                if (!this.marked[i][j]) {
                    unmarked += this.board[i][j];
                }
            }
        }

        return unmarked;
    }

    get
    winner() {
        for (let i = 0; i < this.marked.length; i++) {
            if (this.marked[i].reduce((p,c) => p && c, true)) {
                return true;
            }
        }

        let allMarked = true;
        for (let i = 0; i < this.marked.length; i++) {
            allMarked = true;
            for (let j = 0; j < this.marked.length; j++) {
                allMarked = allMarked && this.marked[j][i];
            }
            if (allMarked) {
                return allMarked;
            }
        }

        return allMarked;
    }
}
const testSelections = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];

const testOne = [[22, 13, 17, 11, 0],
[8, 2, 23, 4, 24],
[21, 9, 14, 16, 7],
[6, 10, 3, 18, 5],
[1, 12, 20, 15, 19]]

const testTwo = [[3, 15, 0, 2, 22],
[9, 18, 13, 17, 5],
[19, 8, 7, 25, 23],
[20, 11, 10, 24, 4],
[14, 21, 16, 12, 6]]

const testThree = [[14, 21, 17, 24, 4],
[10, 16, 15, 9, 19],
[18, 8, 23, 26, 20],
[22, 11, 13, 6, 5],
[2, 0, 12, 3, 7]]

const testBoards = [new BingoBoard(testOne), new BingoBoard(testTwo), new BingoBoard(testThree)];

const thereIsAWinner = (b: BingoBoard[]): number => {
    for (let i = 0; i < b.length; i++) {
        if (b[i].winner) {
            return i;
        }
    }

    return -1;
}

for (let i = 0; i < testSelections.length; i++) {
    testBoards[0].markSquare(testSelections[i]);
    testBoards[1].markSquare(testSelections[i]);
    testBoards[2].markSquare(testSelections[i]);

    const ans = thereIsAWinner(testBoards);

    if (ans >= 0) {
        console.log('Test Answer:', testBoards[ans].unmarkedScore * testSelections[i]);
        break;
    }
}

assert.equal(testBoards[0].winner, false)
assert.equal(testBoards[1].winner, false)
assert.equal(testBoards[2].winner, true);

const rawInput = fs.readFileSync('./input/day4', { encoding: 'utf-8' }).split('\n\n');
const [rawSelections, ...rawBoards] = rawInput;
const selections = rawSelections.split(',').map(e => parseInt(e, 10));
const boards = rawBoards.map(e => e.split('\n')).map(e => e.map(f => f.trim().replace(/  /g, ' ').split(' ').map(g => parseInt(g))))
const boardInstances = boards.map(b => new BingoBoard(b));

for (let i = 0; i < selections.length; i++) {
    for (let j = 0; j < boardInstances.length; j++) {
        boardInstances[j].markSquare(selections[i]);
    }

    const winner = thereIsAWinner(boardInstances);

    if (winner > 0) {
        console.log('Part 1 Answer:', boardInstances[winner].unmarkedScore * selections[i]);
        break;
    }
}

let part2Boards = boards.map(b => new BingoBoard(b));

const getLast = () => {
    for (let i = 0; i < selections.length; i++) {
        for (let j = 0; j < part2Boards.length; j++) {
            part2Boards[j].markSquare(selections[i]);
        }

        const tmp = part2Boards.filter(b => !b.winner);

        if (tmp.length === 1) {
            return tmp[0];
        }
    }

    console.error('ERR')

    return part2Boards[0];
}

const last = getLast();

const nB = new BingoBoard(last.board);

for (let i = 0; i < selections.length; i++) {
    nB.markSquare(selections[i]);

    if (nB.winner) {
        console.log('Part 2 Answer:', nB.unmarkedScore * selections[i]);
        break;
    }
}