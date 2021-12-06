import * as fs from 'fs';

const input = fs.readFileSync('./input/day6', { encoding: 'utf-8' }).split(',').map(e => parseInt(e, 10))

for (let i = 0; i < 80; i++) {
    let toAppend = 0;
    for (let j = 0; j < input.length; j++) {
        if (input[j] === 0) {
            input[j] = 6;
            toAppend++;
        } else {
            input[j] -= 1;
        }
    }

    for (let k = 0; k < toAppend; k++) {
        input.push(8);
    }
}

console.log('Answer One:', input.length);

const rawInput = fs.readFileSync('./input/day6', { encoding: 'utf-8' }).split(',').map(e => parseInt(e, 10))

interface IInputTwo {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    [index: string]: number;
}
const inputTwo: IInputTwo = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
}

for (let i = 0; i < rawInput.length; i++) {
    inputTwo[rawInput[i].toString()] += 1;
}

for (let i = 0; i < 256; i++) {
    const previous = { ...inputTwo };
    inputTwo['0'] = previous['1'];
    inputTwo['1'] = previous['2'];
    inputTwo['2'] = previous['3'];
    inputTwo['3'] = previous['4'];
    inputTwo['4'] = previous['5'];
    inputTwo['5'] = previous['6'];
    inputTwo['6'] = previous['7'] + previous['0'];
    inputTwo['7'] = previous['8'];
    inputTwo['8'] = previous['0'];
}

const total = inputTwo['0'] + inputTwo['1'] + inputTwo['2'] + inputTwo['3'] + inputTwo['4'] + inputTwo['5'] + inputTwo['6'] + inputTwo['7'] + inputTwo['8'];


console.log('Answer Two:', total);