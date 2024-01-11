import { IComposer } from '../composer/composer.interface';
import {
    ComposerBenchmarkResult,
    ComposerData,
    IComposerBenchmark,
} from './composer-benchmark.interface';


export class ComposerBenchmark implements IComposerBenchmark {
    sample (title: string, composer: IComposer, dataList: ComposerData[]): ComposerBenchmarkResult {
        return {
            title  : title,
            results: dataList.map((dataItem: ComposerData) => {
                const startComposeTime: number    = Date.now();
                const composed: string            = composer.compose(dataItem.data);
                const finishComposeTime: number   = Date.now();
                const startDecomposeTime: number  = Date.now();
                const decomposed: string          = composer.decompose(composed);
                const finishDecomposeTime: number = Date.now();

                return {
                    title          : dataItem.title,
                    timeToCompose  : finishComposeTime - startComposeTime,
                    timeToDecompose: finishDecomposeTime - startDecomposeTime,
                    efficiency     : 100 - 100 / dataItem.data.length * composed.length,
                    dataLoss       : dataItem.data.length !== decomposed.length,
                    dataChanges    : dataItem.data !== decomposed,
                    composeSize    : composed.length,
                    originalSize   : dataItem.data.length,
                };
            }),
        };
    }
}