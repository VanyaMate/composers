import { IComposer } from '../../../composer.interface';
import LZUTF8 from 'lzutf8';


export class Lzutf8Composer implements IComposer {
    constructor (private readonly _encodingType: LZUTF8.CompressedEncoding) {
    }

    compose (data: string): string {
        return LZUTF8.compress(data, { outputEncoding: this._encodingType });
    }

    decompose (data: string): string {
        return LZUTF8.decompress(data, { inputEncoding: this._encodingType });
    }
}