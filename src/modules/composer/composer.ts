import { IComposer } from './composer.interface';


export class Composer implements IComposer {
    private _composersReversed: IComposer[] = [];

    constructor (private readonly _composers: IComposer[]) {
        this._composersReversed = [ ...this._composers ].reverse();
    }

    compose (data: string): string {
        return this._composers.reduce((acc, composer) => composer.compose(acc), data);
    }

    decompose (data: string): string {
        return this._composersReversed.reduce((acc, composer) => composer.decompose(acc), data);
    }
}