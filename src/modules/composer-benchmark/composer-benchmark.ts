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
                    dataLoss       : !this._validData(dataItem.data, decomposed),
                    dataChanges    : dataItem.data !== decomposed,
                    composeSize    : composed.length,
                    originalSize   : dataItem.data.length,
                };
            }),
        };
    }

    private _validData (original: string, decomposed: string): boolean {
        const originalNumbers: number[]   = original.split(' ').map(Number).sort((a, b) => a - b);
        const decomposedNumbers: number[] = decomposed.split(' ').map(Number).sort((a, b) => a - b);
        for (let i = 0; i < originalNumbers.length; i++) {
            if (originalNumbers[i] !== decomposedNumbers[i]) {
                return false;
            }
        }
        return true;
    }
}