import { IComposer } from '../../composer.interface';


export class NotationComposer implements IComposer {
    private readonly _digits: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    constructor (
        private readonly _notation: number,
    ) {
    }

    compose (data: string): string {
        if (this._notation < 2 || this._notation > 36) {
            return data;
        }

        const numbers: number[] = data.split(/\s/gi).map(Number);
        return numbers
            .reduce((acc, number) => {
                let result: string = '';

                while (number > 0) {
                    const remainder: number = number % this._notation;
                    result                  = this._digits[remainder] + result;
                    number                  = Math.floor(number / this._notation);
                }

                acc.push(result.length ? result : '0');
                return acc;
            }, [])
            .join(' ');
    }

    decompose (data: string): string {
        if (this._notation < 2 || this._notation > 36) {
            return data;
        }

        const numbers: string[] = data.split(/\s/gi);
        return numbers
            .reduce((acc, number) => {
                let result: number = 0;

                for (let i = 0; i < number.length; i++) {
                    const digit: number = this._digits.indexOf(number.charAt(i));
                    if (!(digit === -1 || digit >= this._notation)) {
                        result = result * this._notation + digit;
                    }
                }

                acc.push(result);
                return acc;
            }, [])
            .join(' ');
    }

}