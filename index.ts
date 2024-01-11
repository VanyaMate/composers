import { Composer } from './src/modules/composer/composer';
import * as fs from 'fs';
import { NotationComposer } from './src/modules/composer/composers/notation-composer';
import { SpaceComposer } from './src/modules/composer/composers/space-composer';


const random1000 = fs.readFileSync(__dirname + '/data/numbers1000.txt');

const composer   = new Composer([
    new NotationComposer(32),
    new SpaceComposer(),
]);
const string     = random1000.toString();
const stringSize = new Blob([ string ]).size;
console.log('string: ', string);
console.log('\n________________________________________________');
console.log('SIZE OF');
console.log('STRING: \t', stringSize);

const composeString = composer.compose(string);
const composeSize   = new Blob([ composeString ]).size;
console.log('COMPOSE:  \t', composeSize);

const decomposeString = composer.decompose(composeString);
const decomposeSize   = new Blob([ decomposeString ]).size;
console.log('DECOMPOSE:  \t', decomposeSize);
console.log('\nECONOMY: \t', 100 - 100 / stringSize * composeSize, '%');

console.log('\n________________________________________________');
console.log('VALID CHECK');
console.log('CORRECT: ', string === decomposeString);
console.log('LENGTH:', string.length, decomposeString.length);

const chunks     = string.split(/\s/g);
const decoChunks = decomposeString.split(/\s/g);
for (let i = 0; i < chunks.length; i++) {
    if (chunks[i] !== decoChunks[i]) {
        console.log('ERR:', `[${ i }]`, chunks[i], decoChunks[i]);
    }
}