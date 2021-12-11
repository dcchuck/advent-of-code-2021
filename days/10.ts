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

    for (let i = 0; i < inp.length; i++) {
        if (opening.includes(inp[i])) {
            trackingString = trackingString + inp[i];
        } else {
            const closingMatch = paired[inp[i]];
            if (trackingString[trackingString.length - 1] !== closingMatch) {
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
    partOnePoints += points[found];
}

console.log('Part 1', partOnePoints);

const getRemainingString = (inp: string): string => {
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

    for (let i = 0; i < inp.length; i++) {
        if (opening.includes(inp[i])) {
            trackingString = trackingString + inp[i];
        } else {
            const closingMatch = paired[inp[i]];
            if (trackingString[trackingString.length - 1] !== closingMatch) {
                return 'ERR';
            } else {
                trackingString = trackingString.slice(0,-1);
            }
        }
    }

    return trackingString;
}

const pointVals: IPOTO = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}
const pointRemaining = (rem: string): number => {
    let tracking = rem;
    let points = 0;

    while (tracking.length > 0) {
        points = points * 5;
        const char = tracking[tracking.length - 1];
        points += pointVals[char];
        tracking = tracking.slice(0,-1);
    }

    return points;
}

const vals = []
for (let i = 0; i < input.length; i++) {
    const remaining = getRemainingString(input[i]);

    if (remaining !== 'ERR') {
        vals.push(remaining);
    }
}

const pt2Points = vals.map(pointRemaining).sort((p,c) => p - c);

console.log('Answer 2:', pt2Points[(pt2Points.length - 1)/2]);