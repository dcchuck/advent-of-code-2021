import * as fs from 'fs';

const input = fs.readFileSync('./input/day7', { encoding: 'utf-8'}).split(',').map(e => parseInt(e));
// const input = fs.readFileSync('./input/day7test', { encoding: 'utf-8'}).split(',').map(e => parseInt(e));

const max = Math.max(...input)
const min = Math.min(...input)

const distances = new Array(max);

for (let dist = 0; dist < distances.length; dist++) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += Math.abs(input[i] - dist);
        // part1 += Math.abs(input[i] - (average));
    }
    distances[dist] = total;
}

const minDistance = Math.min(...distances)
const minDistanceDepth = distances.indexOf(minDistance)

const answer1 = input.map(e => Math.abs(e - minDistanceDepth)).reduce((p,c) => p+c)
console.log('Answer 1:', answer1);

const ndistances = new Array(max);

for (let dist = 0; dist < ndistances.length; dist++) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        // (n * (n + 1))/2
        let n = Math.abs(input[i] - dist);
        total += (n * (n+1))/2;
    }
    ndistances[dist] = total;
}

const minNDistance = Math.min(...ndistances)
const minNDistanceDepth = ndistances.indexOf(minNDistance)

const answer2 = input.map(e => {
    let n = Math.abs(e - minNDistanceDepth);

    return (n * (n+1))/2;
}).reduce((p,c) => p+c)

console.log('Answer 2:', answer2);