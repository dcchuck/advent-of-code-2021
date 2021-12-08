import * as fs from 'fs';

const input = fs.readFileSync('./input/day8', { encoding: 'utf-8' }).split('\n').map(e => e.split(' | ').map(e => e.split(' ').map(e => e.split('').sort().join(''))))
// const input = fs.readFileSync('./input/day8test', { encoding: 'utf-8' }).split('\n').map(e => e.split(' | ').map(e => e.split(' ').map(e => e.split('').sort().join(''))))

console.log(input)

/**
 * one uses TWO
 * four uses FOUR
 * seven uses THREE
 * eight uses SEVEN
 */

let found = 0;

for (let i = 0; i < input.length; i++) {
    const toCheck = input[i][1];
    toCheck.forEach(e => {
        if ([2, 3, 4, 7].includes(e.length)) {
            found++;
        }
    })
}

console.log('Answer 1:', found);

interface IndexableObj {
    [index: string]: any;
}

for (let i = 0; i < input.length; i++) {
    const answers = input[i][0];
    const myObj: IndexableObj = {};
    for (let j = 0; j < answers.length; j++) {
        switch(answers[j].length) {
            case 2:
                myObj[answers[j]] = 1;
                break;
            case 3:
                myObj[answers[j]] = 7;
                break;
            case 4:
                myObj[answers[j]] = 4;
                break;
            case 7:
                myObj[answers[j]] = 8;
                break;
            default:
                myObj[answers[j]] = undefined;
        }
    }

    input[i].push(myObj as unknown as any);
}

for (let i = 0; i < input.length; i++) {
    const answers = input[i][0];
    const myObj: IndexableObj = input[i][2];
    const oneVal = Object.keys(myObj).filter((k: string) => myObj[k] === 1)[0];
    const isThree = answers.filter(a => {
        return a.length === 5 && a.includes(oneVal[0]) && a.includes(oneVal[1]);
    })[0];
    const isSix = answers.filter(a => {
        if (a.length !== 6) {
            return false;
        }

        return !(a.includes(oneVal[0]) && a.includes(oneVal[1]));
    })[0]
    myObj[isThree] = 3;
    myObj[isSix] = 6;

    answers.forEach(a => {
        if (a.length !== 5 || myObj[a] !== undefined) {
            return;
        }
        let isFive = true;

        for (let k = 0; k < a.length; k++) {
            isFive = isSix.includes(a[k]) && isFive;
        }

        if (isFive) {
            myObj[a] = 5;
        } else {
            myObj[a] = 2;
        }
    })

    const fiveVal = Object.keys(myObj).filter((k: string) => myObj[k] === 5)[0];

    answers.forEach(a => {
        if (a.length !== 6 || myObj[a] !== undefined) {
            return;
        }

        let isNine = true;

        for (let k = 0; k < fiveVal.length; k++) {
            isNine = a.includes(fiveVal[k]) && isNine;
        }

        if (isNine) {
            myObj[a] = 9;
        } else {
            myObj[a] = 0;
        }
    })
}

let partTwo = 0;

for (let i = 0; i < input.length; i++) {
    const [translate, toAdd, keys] = input[i];
    const res = toAdd.map((e: string) => (keys as unknown as any)[e].toString()).join('')
    console.log(toAdd)
    console.log(res)
    partTwo += parseInt(res);
}

// console.log(input)
console.log('Answer 2:', partTwo)
