import { error } from 'console';
import * as fs from 'fs';

const input = fs.readFileSync('./input/day10', { encoding: 'utf-8' }).split('\n');
// const input = fs.readFileSync('./input/day10test', { encoding: 'utf-8' }).split('\n');

const opening = ['{', '(', '[', '<'];

interface IPOTO {
    [index: string]: any;
}

const points: IPOTO= {
    '}': 1197,
    ')': 3,
    ']': 57,
    '>': 25137,
    'NONE': 0,
}

const getIllegalChar = (inp: string): string => {
    const count: IPOTO = {
        '{': 0,
        '(': 0,
        '[': 0,
        '<': 0,
    }

    const paired: IPOTO= {
        '}': '{',
        ')': '(',
        ']': '[',
        '>': '<',
    }

    let trackingString = '';

    console.log('========^^^^^^^^========')
    console.log('PROCESSING', inp);
    for (let i = 0; i < inp.length; i++) {
        if (opening.includes(inp[i])) {
            trackingString = trackingString + inp[i];
            // console.log('OPENING FOUND', inp[i])
            // count[inp[i]] += 1;
            // console.log('COUNT', count)
        } else {
            const closingMatch = paired[inp[i]];
            // console.log('TRACKING', trackingString)
            // console.log('LOOKING FOR', closingMatch)
            if (trackingString[trackingString.length - 1] !== closingMatch) {
                console.log('WE GOT ONE', closingMatch, paired[inp[i]])
                return inp[i];
            } else {
                trackingString = trackingString.slice(0,-1);
            }
        }
    }

    return 'NONE';
}

let partOnePoints = 0;

for (let i = 0; i < input.length; i++) {
    const found = getIllegalChar(input[i]);
    console.log('FOUND', found)
    partOnePoints += points[found];
}

console.log('Part 1', partOnePoints);