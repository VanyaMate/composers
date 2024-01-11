import { Composer } from './src/modules/composer/composer';
import * as fs from 'fs';
import { NotationComposer } from './src/modules/composer/composers/notation-composer';
import { SpaceComposer } from './src/modules/composer/composers/space-composer';


const random50     = fs.readFileSync(__dirname + '/data/numbers50.txt');
const random100    = fs.readFileSync(__dirname + '/data/numbers100.txt');
const random500    = fs.readFileSync(__dirname + '/data/numbers500.txt');
const random1000   = fs.readFileSync(__dirname + '/data/numbers1000.txt');
const random09     = fs.readFileSync(__dirname + '/data/numbers_0-9_900.txt');
const random1099   = fs.readFileSync(__dirname + '/data/numbers_10-99_900.txt');
const random100999 = fs.readFileSync(__dirname + '/data/numbers_100-999_900.txt');

const composer = new Composer([
    new NotationComposer(32),
    new SpaceComposer(),
]);

const data = [
    { string: random50.toString(), name: 'random 50' },
    { string: random100.toString(), name: 'random 100' },
    { string: random500.toString(), name: 'random 500' },
    { string: random1000.toString(), name: 'random 1000' },
    { string: random09.toString(), name: 'random 0-9' },
    { string: random1099.toString(), name: 'random 10-99' },
    { string: random100999.toString(), name: 'random 100-990' },
]
    .map(({ string, name }) => {
        const stringSize      = new Blob([ string ]).size;
        const composeString   = composer.compose(string);
        const composeSize     = new Blob([ composeString ]).size;
        const decomposeString = composer.decompose(composeString);
        const decomposeSize   = new Blob([ decomposeString ]).size;
        return { list: name, stringSize, composeSize, decomposeSize };
    });

/*console.log('\n________________________________________________');
 console.log('STRINGS');
 console.log('\nORIGINAL\n\n', string);
 console.log('\nCOMPOSED\n\n', composeString);
 console.log('\nDECOMPOS\n\n', decomposeString);*/


console.log('\n________________________________________________');
console.log('SIZE OF\t\t', data.map((item) => `\t${ item.list }`).join(''));
console.log('STRING: ', data.map((item) => `\t\t${ item.stringSize }`).join(''));
console.log('COMPOSE: ', data.map((item) => `\t\t${ item.composeSize }`).join(''));
console.log('DECOMPOSE: ', data.map((item) => `\t\t${ item.decomposeSize }`).join(''));
console.log('\nECONOMY: ', data.map((item) => `\t\t~${ (100 - 100 / item.stringSize * item.composeSize).toFixed(2) }%`).join(''));
console.log('\n________________________________________________');
console.log('VALID CHECK');
console.log('CORRECT: ', data.map((item) => `\t\t${ item.stringSize === item.decomposeSize }`).join(''));

/*
 const chunks     = string.split(/\s/g);
 const decoChunks = decomposeString.split(/\s/g);
 for (let i = 0; i < chunks.length; i++) {
 if (chunks[i] !== decoChunks[i]) {
 console.log('ERR:', `[${ i }]`, chunks[i], decoChunks[i]);
 }
 }*/
