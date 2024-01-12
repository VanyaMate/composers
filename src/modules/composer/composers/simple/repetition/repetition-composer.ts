import { IComposer } from '../../../composer.interface';


/**
 * TODO: Не будет сокращать посторяющиеся наборы. Например 1414141414.
 */
export class RepetitionComposer implements IComposer {
    compose (data: string): string {
        const symbols: string[]   = data.split('');
        let currentSymbol: string = symbols[0];
        let repeats: number       = 1;
        let result: string        = '';

        for (let i = 1; i < symbols.length; i++) {
            const symbol: string = symbols[i];
            if (symbol === currentSymbol) {
                repeats += 1;
                continue;
            } else {
                result += this._composeFormat(repeats, currentSymbol);
            }
            repeats       = 1;
            currentSymbol = symbol;
        }

        result += this._composeFormat(repeats, currentSymbol);
        return result;
    }

    decompose (data: string): string {
        let result: string   = '';
        let dotFind: boolean = false;
        let afterDot: string = '';
        for (let i = 0; i < data.length;) {
            const symbol: string = data[i];

            if (symbol === '.') {
                dotFind = true;
                i++;
                continue;
            }

            if (symbol === '!') {
                const repeats: number        = afterDot ? Number(afterDot)
                                                        : Number(data[i - 1]);
                const repeatedString: string = data[i + 1];
                if (!dotFind) {
                    result = result.slice(0, -1);
                }
                result += repeatedString.repeat(repeats);
                afterDot = '';
                dotFind  = false;
                i += 2;
                continue;
            }

            if (dotFind) {
                afterDot += symbol;
                i++;
                continue;
            }

            result += symbol;
            i++;
        }

        return result;
    }

    private _composeFormat (repeats: number, symbol: string): string {
        if (repeats > 9) {
            return `.${ repeats }!${ symbol }`;
        } else if (repeats > 3) {
            return `${ repeats }!${ symbol }`;
        } else {
            return `${ symbol }`.repeat(repeats);
        }
    }
}