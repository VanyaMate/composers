import { NumberListFileGenerator } from './src/modules/data-generator/number-list-file-generator';


const args = process.argv;
if (args[2] && args[3] && args[4] && args[5]) {
    const generator = new NumberListFileGenerator(__dirname + '/data');
    generator
        .generate(+args[2], +args[3], +args[4], args[5])
        .then(() => console.log('done'));
} else {
    console.log('No valid format');
}
