import {
    ComposerBenchmarkResult,
    ComposerBenchmarkResultItem,
} from '../../composer-benchmark.interface';
import { IComposerBenchmarkView } from '../composer-benchmark-view.interface';


export type ConsoleComposerOptions = {
    headerLength?: number;
    headerFiller?: string;
    headerSpace?: number;
    itemWidth?: number;
    itemSpace?: number;
}

export class ConsoleComposerBenchmarkView implements IComposerBenchmarkView {
    private readonly _headerLength: number;
    private readonly _headerFiller: string;
    private readonly _headerSpace: number;
    private readonly _itemWidth: number;
    private readonly _itemSpace: number;

    constructor (options?: ConsoleComposerOptions) {
        this._headerLength = options?.headerLength ?? 50;
        this._headerFiller = options?.headerFiller ?? '-';
        this._headerSpace  = options?.headerSpace ?? 2;
        this._itemWidth    = options?.itemWidth ?? 24;
        this._itemSpace    = options?.itemSpace ?? 4;
    }

    render (results: ComposerBenchmarkResult): void {
        this._header(results.title);
        this._results(results.results);
    }

    private _header (title: string): void {
        const titleLength: number = title.length + this._headerSpace;
        const leftSide: number    = Math.floor((this._headerLength - titleLength) / 2);
        const rightSide: number   = this._headerLength - titleLength - leftSide;
        const leftSpace: number   = Math.floor(this._headerSpace / 2);
        const rightSpace: number  = this._headerSpace - leftSpace;

        console.log(`${ this._headerFiller.repeat(leftSide) }${ ' '.repeat(leftSpace) }${ title }${ ' '.repeat(rightSpace) }${ this._headerFiller.repeat(rightSide) }`);
    }

    private _results (results: ComposerBenchmarkResultItem[]): void {
        this._resultHeader();
        results.map(this._row.bind(this));
    }

    private _resultHeader () {
        console.log(
            `\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m`,
            `${ this._item('DATA_TITLE') }`,
            `${ this._item('COMPOSE_TIME') }`,
            `${ this._item('DECOMPOSE_TIME') }`,
            `${ this._item('ORIGINAL_SIZE') }`,
            `${ this._item('COMPOSE_SIZE') }`,
            `${ this._item('EFFICIENCY') }`,
            `${ this._item('DATA_LOSS') }`,
            `${ this._item('DATA_CHANGES') }`,
        );
    }

    private _row (item: ComposerBenchmarkResultItem): void {
        console.log(
            `\x1b[36m%s\x1b[34m%s\x1b[34m%s\x1b[37m%s\x1b[${ item.originalSize >= item.composeSize
                                                             ? '32'
                                                             : '31' }m%s\x1b[${ item.efficiency > 0
                                                                                ? '32'
                                                                                : '31' }m%s\x1b[${ item.dataLoss
                                                                                                   ? '31'
                                                                                                   : '32' }m%s\x1b[${ item.dataChanges
                                                                                                                      ? '31'
                                                                                                                      : '32' }m%s\x1b[0m`,
            `${ this._item(item.title) }`,
            `${ this._item(`${ item.timeToCompose } ms`) }`,
            `${ this._item(`${ item.timeToDecompose } ms`) }`,
            `${ this._item(item.originalSize) }`,
            `${ this._item(item.composeSize) }`,
            `${ this._item(`~${ item.efficiency.toFixed(4) }%`) }`,
            `${ this._item(item.dataLoss) }`,
            `${ this._item(item.dataChanges) }`,
        );
    }

    private _item (data: any): string {
        return data.toString().slice(0, this._itemWidth - this._itemSpace).padEnd(this._itemWidth);
    }
}