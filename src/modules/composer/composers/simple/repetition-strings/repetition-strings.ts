import { IComposer } from '../../../composer.interface';


export class RepetitionStringsComposer implements IComposer {
    constructor (private readonly _singleStringComposer: IComposer) {
    }

    compose (data: string): string {
        const chunks: string[]                       = data.split(' ');
        const repetitions: { [key: string]: number } = {};
        for (let i = 0; i < chunks.length; i++) {
            const chunk: string = chunks[i];
            if (repetitions[chunk]) {
                repetitions[chunk] += 1;
            } else {
                repetitions[chunk] = 1;
            }
        }
        let repetitionChunks: string[] = [];
        let singleChunks: string[]     = [];
        Object.entries(repetitions).forEach(([ chunk, count ]) => {
            if (count > 1) {
                repetitionChunks.push(`${ count }%${ chunk }`);
            } else {
                singleChunks.push(chunk);
            }
        });
        return repetitionChunks.join('^') + (singleChunks.length
                                             ? ('|' + this._singleStringComposer.compose(singleChunks.join(' ')))
                                             : '');
    }

    decompose (data: string): string {
        const [ repetitionString, singleString ] = data.split('|');
        const numbers: string[]                  = singleString?.length
                                                   ? this._singleStringComposer.decompose(singleString).split(' ')
                                                   : [];
        const repetitions: string[]              = repetitionString.split('^');
        for (let i = 0; i < repetitions.length; i++) {
            const [ count, chunk ] = repetitions[i].split('%');
            for (let j = 0; j < Number(count); j++) {
                numbers.push(chunk);
            }
        }
        return numbers.join(' ');
    }

}