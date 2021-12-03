import * as fs from 'fs';

const input = fs.readFileSync('./input/day3', { encoding: 'utf-8'}).split('\n').map(e => e.split('')).map(e => e.map(el => parseInt(el)));

const bitCountReducer = (pV: number[], cV: number[]) => {
    for (let i = 0; i < 12; i++) {
        pV[i] = pV[i] + cV[i];
    }

    return pV;
}

const reduced = input.reduce(bitCountReducer, [0,0,0,0,0,0,0,0,0,0,0,0])

const commonBits = reduced.map(e => e > input.length/2 ? 1 : 0)
const uncommonBits = reduced.map(e => e > input.length/2 ? 0 : 1)
const gamma = parseInt(commonBits.join(''), 2);
const epsilon = parseInt(uncommonBits.join(''), 2);

console.log('Answer 1: ', gamma * epsilon)

const val = (type: 'o' | 'c') => {
    let o = [...input];
    for (let i = 0; i < input[0].length; i++) {
        const commonComp = o.reduce(bitCountReducer, [0,0,0,0,0,0,0,0,0,0,0,0]).map(e => e >= o.length/2 ? 1 : 0);
        const uncommonComp = o.reduce(bitCountReducer, [0,0,0,0,0,0,0,0,0,0,0,0]).map(e => e >= o.length/2 ? 0 : 1);
        o = o.filter(e => e[i] === (type === 'o' ? commonComp[i] : uncommonComp[i]));

        if (o.length === 1) {
            return parseInt(o[0].join(''), 2);
        }
    }

    return 0;
}

console.log('Answer 2:', val('o') * val('c'));