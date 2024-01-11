import { ComposerBenchmarkResult } from '../composer-benchmark.interface';


export interface IComposerBenchmarkView {
    render (results: ComposerBenchmarkResult): void;
}