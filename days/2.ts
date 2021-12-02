import * as fs from 'fs';

const input = fs.readFileSync('./input/day2', { encoding: 'utf-8' }).split('\n').map(e => e.split(' '));

let horizontal = 0;
let depth = 0;

for (let i = 0; i < input.length; i++) {
    switch(input[i][0]) {
        case 'forward':
            horizontal += parseInt(input[i][1]);
            break;
        case 'up': 
            depth -= parseInt(input[i][1]);
            break;
        case 'down':
            depth += parseInt(input[i][1]);
            break;
    }
}

console.log('Answer 1:', horizontal * depth);

horizontal = 0;
depth = 0;
let aim = 0;

for (let i = 0; i < input.length; i++) {
    switch(input[i][0]) {
        case 'forward':
            horizontal += parseInt(input[i][1]);
            depth += parseInt(input[i][1]) * aim;
            break;
        case 'up': 
            aim -= parseInt(input[i][1]);
            break;
        case 'down':
            aim += parseInt(input[i][1]);
            break;
    }
}

console.log('Answer 2:', horizontal * depth);