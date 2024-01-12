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
    ComposerBenchmarkResult, ComposerData, IComposerBenchmark,
} from './src/modules/composer-benchmark/composer-benchmark.interface';
import {
    IComposerBenchmarkView,
} from './src/modules/composer-benchmark/view/composer-benchmark-view.interface';
import {
    ConsoleComposerBenchmarkView,
} from './src/modules/composer-benchmark/view/console/console-composer-benchmark-view';
import {
    Lzutf8Composer,
} from './src/modules/composer/composers/third-party/lzutf8/lzutf8-composer';
import {
    DataLossComposerValidator,
} from './src/modules/composer-validator/validators/data-loss-composer-validator';
import { IComposer } from './src/modules/composer/composer.interface';


const random50     = fs.readFileSync(__dirname + '/data/numbers50.txt');
const random100    = fs.readFileSync(__dirname + '/data/numbers100.txt');
const random500    = fs.readFileSync(__dirname + '/data/numbers500.txt');
const random1000   = fs.readFileSync(__dirname + '/data/numbers1000.txt');
const random100000 = fs.readFileSync(__dirname + '/data/numbers100000.txt');
const random09     = fs.readFileSync(__dirname + '/data/numbers_0-9_900.txt');
const random1099   = fs.readFileSync(__dirname + '/data/numbers_10-99_900.txt');
const random100999 = fs.readFileSync(__dirname + '/data/numbers_100-999_900.txt');


const withoutSaveOrderComposer: IComposer = new Composer([
    new SumComposer(),
    new RepetitionComposer(),
]);

const withoutSaveOrderWithLzutf8Composer: IComposer = new Composer([
    new SumComposer(),
    new RepetitionComposer(),
    new Lzutf8Composer('BinaryString'),
]);

const saveOrderComposer: IComposer = new Composer([
    new NotationComposer(36),
    new SpaceComposer(),
]);

const dataList: ComposerData[] = [
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

const benchmarkView: IComposerBenchmarkView = new ConsoleComposerBenchmarkView({ headerLength: 180 });
const benchmark: IComposerBenchmark         = new ComposerBenchmark([ new DataLossComposerValidator() ]);

const saveOrderResult: ComposerBenchmarkResult                 = benchmark.sample('[Notation, Space] save data', saveOrderComposer, dataList);
const soloLzutf8: ComposerBenchmarkResult                      = benchmark.sample('[Lzutf8-Binary] save data', new Lzutf8Composer('BinaryString'), dataList);
const withoutSaveOrderResult: ComposerBenchmarkResult          = benchmark.sample('[Sum, Repetition] no save data', withoutSaveOrderComposer, dataList);
const withoutSaveWithLzutfOrderResult: ComposerBenchmarkResult = benchmark.sample('[Sum, Repetition, Lzutf8-Binary] no save data', withoutSaveOrderWithLzutf8Composer, dataList);

benchmarkView.render(soloLzutf8);
benchmarkView.render(withoutSaveWithLzutfOrderResult);
benchmarkView.render(saveOrderResult);
benchmarkView.render(withoutSaveOrderResult);
