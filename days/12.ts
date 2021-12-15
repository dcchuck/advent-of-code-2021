import * as fs from 'fs';
import { rawListeners } from 'process';

// const test1 = fs.readFileSync('./input/day12test1', { encoding: 'utf-8' });
// const test2 = fs.readFileSync('./input/day12test2', { encoding: 'utf-8' });
// const test3 = fs.readFileSync('./input/day12test3', { encoding: 'utf-8' });

const input = fs.readFileSync('./input/day12', { encoding: 'utf-8' });

interface Indexable {
    [index: string]: any;
}

const getNodes = (rawInputString: string) => {
    const lines = rawInputString.split('\n').flatMap(e => e.split('-'))
    const tmp: Indexable = {}
    for (let i = 0; i < lines.length; i++) {
        tmp[lines[i]] = 0;
    }

    return Object.keys(tmp);
}

const getLines = (rawInputSring: string) => {
    const lines = rawInputSring.split('\n').map(e => e.split('-'))

    return lines;
}

const rawNodes = getNodes(input);
console.log(rawNodes)
const rawLines = getLines(input);

class Node {
    public id: string;
    public connections: Set<string>;

    constructor(id: string) {
        this.id = id;
        this.connections = new Set();
    }

    addConnection(nodeID: string) {
        this.connections.add(nodeID);
    }
}

const nodes: Node[] = [];

for (let i = 0; i < rawNodes.length; i++) {
   nodes.push(new Node(rawNodes[i]));
}

for (let i = 0; i < rawLines.length; i++) {
    const [node1, node2] = rawLines[i];
    const node1Instance = nodes.find(e => e.id === node1);
    const node2Instance = nodes.find(e => e.id === node2);
    node1Instance?.addConnection(node2);
    node2Instance?.addConnection(node1);
}

const paths: string[] = [];

const start = nodes.find(e => e.id === 'start');

const pathIsInvalid = (path: string) => {
    path = path.replace('start', '');

    if (path === '') {
        return false;
    }

    const pathChars = path.split('-');

    const lowercase: Indexable = {}

    for (let i = 0; i < pathChars.length; i++) {
        if (pathChars[i] === pathChars[i].toUpperCase()) {
            continue;
        } else {
            if (lowercase[pathChars[i]]) {
                // toggle this 1 to 0 for part 1
                if (lowercase[pathChars[i]] === 1 && Object.values(lowercase).filter((e: number) => e > 1).length === 0) {
                    lowercase[pathChars[i]] = 2;
                } else {
                    return true;
                }
            } else {
                lowercase[pathChars[i]] = 1;
            }
        }
    }

    return false;
}

let pathcount = 0;

const pathToEnd = (node: Node, path: string) => {
    if (path === '') {
        path = node.id;
    } else {
        path = `${path}-${node.id}`
    }

    if (pathIsInvalid(path)) {
        return path;
    }

    if (node.id === 'end') {
        console.log('Found Path', path);
        pathcount += 1;
        return path;
    }

    node.connections.forEach(connection => {
        if (connection === 'start') {
            return;
        }

        const foundNode = nodes.find(e => e.id === connection);
        if (foundNode) {
            pathToEnd(foundNode, path);
        } else {
            console.error('No such node', connection);
        }
    })
}

if (start) {
    pathToEnd(start, '');
    console.log('Answer 2:', pathcount);
}