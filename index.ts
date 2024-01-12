import { Composer } from './src/modules/composer/composer';
import * as fs from 'fs';
import {
    NotationComposer,
} from './src/modules/composer/composers/simple/notation/notation-composer';
import {
    SpaceComposer,
} from './src/modules/composer/composers/simple/space/space-composer';
import {
    SumComposer,
} from './src/modules/composer/composers/simple/summator/sum-composer';
import {
    RepetitionComposer,
} from './src/modules/composer/composers/simple/repetition/repetition-composer';
import { ComposerBenchmark } from './src/modules/composer-benchmark/composer-benchmark';
import {
    ComposerBenchmarkResult, IComposerBenchmark,
} from './src/modules/composer-benchmark/composer-benchmark.interface';
import {
    IComposerBenchmarkView,
} from './src/modules/composer-benchmark/view/composer-benchmark-view.interface';
import {
    ConsoleComposerBenchmarkView,
} from './src/modules/composer-benchmark/view/console/console-composer-benchmark-view';


const random50     = fs.readFileSync(__dirname + '/data/numbers50.txt');
const random100    = fs.readFileSync(__dirname + '/data/numbers100.txt');
const random500    = fs.readFileSync(__dirname + '/data/numbers500.txt');
const random1000   = fs.readFileSync(__dirname + '/data/numbers1000.txt');
const random100000 = fs.readFileSync(__dirname + '/data/numbers100000.txt');
const random09     = fs.readFileSync(__dirname + '/data/numbers_0-9_900.txt');
const random1099   = fs.readFileSync(__dirname + '/data/numbers_10-99_900.txt');
const random100999 = fs.readFileSync(__dirname + '/data/numbers_100-999_900.txt');


const withoutSaveOrderComposer = new Composer([
    new SumComposer(),
    new RepetitionComposer(),
]);

const saveOrderComposer = new Composer([
    new NotationComposer(36),
    new SpaceComposer(),
]);

const dataList = [
    {
        title: 'random 50', data: random50.toString(),
    },
    {
        title: 'random 100', data: random100.toString(),
    },
    {
        title: 'random 500', data: random500.toString(),
    },
    {
        title: 'random 1000', data: random1000.toString(),
    },
    {
        title: 'random 100000', data: random100000.toString(),
    },
    {
        title: 'random 0-9 (900)', data: random09.toString(),
    },
    {
        title: 'random 10-99 (900)', data: random1099.toString(),
    },
    {
        title: 'random 100-999 (900)', data: random100999.toString(),
    },
];

const benchmarkView: IComposerBenchmarkView           = new ConsoleComposerBenchmarkView({ headerLength: 180 });
const benchmark: IComposerBenchmark                   = new ComposerBenchmark();
const saveOrderResult: ComposerBenchmarkResult        = benchmark.sample('save order composer', saveOrderComposer, dataList);
const withoutSaveOrderResult: ComposerBenchmarkResult = benchmark.sample('without save order composer', withoutSaveOrderComposer, dataList);

benchmarkView.render(saveOrderResult);
benchmarkView.render(withoutSaveOrderResult);
