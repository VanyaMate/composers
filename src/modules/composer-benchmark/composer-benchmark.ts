import { IComposer } from '../composer/composer.interface';
import {
    ComposerBenchmarkResult,
    ComposerData,
    IComposerBenchmark,
} from './composer-benchmark.interface';
import { IComposerValidator } from '../composer-validator/composer-validator.interface';


export class ComposerBenchmark implements IComposerBenchmark {
    constructor (private readonly _validators: IComposerValidator[] = []) {
    }

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
                // TODO: Скорее всего в буффер нужно указавать ТИП, но пока не понятно
                const composeSize: number         = Buffer.from(composed).byteLength;
                const originalSize: number        = Buffer.from(dataItem.data).byteLength;

                return {
                    title          : dataItem.title,
                    timeToCompose  : finishComposeTime - startComposeTime,
                    timeToDecompose: finishDecomposeTime - startDecomposeTime,
                    efficiency     : 100 - 100 / originalSize * composeSize,
                    dataLoss       : !this._validators.every((validator) => validator.validate(dataItem.data, decomposed)),
                    dataChanges    : dataItem.data !== decomposed,
                    composeSize    : composeSize,
                    originalSize   : originalSize,
                };
            }),
        };
    }
}