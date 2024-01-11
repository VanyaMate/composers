import { IComposer } from '../../../composer.interface';


export class SumComposer implements IComposer {
    compose (data: string): string {
        const numbers: number[] = data
            .split(/\s/g)
            .map(Number)
            .sort((a, b) => a - b);

        let previous: number = numbers[0];
        let result: string   = previous.toString() ?? '';

        for (let i = 1; i < numbers.length; i++) {
            const number = numbers[i];
            const delta  = number - previous;
            if (delta > 99) {
                result += `c${ delta }`;
            } else if (delta > 9) {
                result += `x${ delta }`;
            } else {
                result += delta;
            }
            previous = number;
        }

        return result;
    }

    decompose (data: string): string {
        const numbers: number[] = this._splitDecomposed(data);
        let currentValue        = 0;
        return numbers
            .reduce((acc, number) => {
                currentValue += number;
                acc.push(currentValue);
                return acc;
            }, [])
            .join(' ');
    }

    private _splitDecomposed (string: string): number[] {
        let result: number[] = [];
        for (let i = 0; i < string.length;) {
            if (string[i] === 'c') {
                result.push(Number(string.slice(i + 1, i + 4)));
                i += 4;
                continue;
            } else if (string[i] === 'x') {
                result.push(Number(string.slice(i + 1, i + 3)));
                i += 3;
                continue;
            } else {
                result.push(Number(string[i]));
                i++;
            }
        }
        return result;
    }
}