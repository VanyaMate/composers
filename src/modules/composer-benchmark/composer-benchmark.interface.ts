import { IComposer } from '../composer/composer.interface';


export type ComposerData = {
    title: string;
    data: string;
};

export type ComposerBenchmarkResultItem = {
    title: string;
    timeToCompose: number;
    timeToDecompose: number;
    originalSize: number;
    composeSize: number;
    efficiency: number;
    dataChanged: boolean;
    dataLoss: boolean;
}

export type ComposerBenchmarkResult = {
    title: string;
    results: ComposerBenchmarkResultItem[];
}

export interface IComposerBenchmark {
    sample (title: string, composer: IComposer, dataList: ComposerData[]): ComposerBenchmarkResult;
}