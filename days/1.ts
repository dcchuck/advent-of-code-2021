import * as fs from 'fs';

const input = fs.readFileSync('./input/day1', { encoding: 'utf-8' }).split('\n').map(e => parseInt(e));

let count = 0;
for (let i = 1; i < input.length; i++) {
   if (input[i] > input[i - 1]) {
       count++;
   }
}

console.log('Answer 1: ', count);

count = 0;
for (let i = 3; i < input.length; i++) {
    if ((input[i] + input[i - 1] + input[i - 2]) > (input[i - 1] + input[i - 2] + input[i - 3])) {
       count++;
    }
}

console.log('Answer 2: ', count);