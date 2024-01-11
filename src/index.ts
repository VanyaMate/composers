import { Composer } from './modules/composer/composer';


const composer = new Composer([]);
const string   = '';

const composeString = composer.compose(string);
console.log('compose string: ', composeString);

const decomposeString = composer.decompose(string);
console.log('decompose string: ', decomposeString);