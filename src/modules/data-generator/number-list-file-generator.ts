import { IDataGenerator } from './data-generator.interface';
import * as fs from 'fs';
import { getRandomInt } from '../../helpers/math/getRandomInt';


export class NumberListFileGenerator implements IDataGenerator {
    constructor (private readonly _folder: string) {
    }

    generate (minNumber: number, maxNumber: number, amount: number, fileName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                const numbers: number[] = new Array(amount);
                for (let i = 0; i < amount; i++) {
                    numbers[i] = getRandomInt(minNumber, maxNumber);
                }
                fs.writeFile(`${ this._folder }/${ fileName }.txt`, numbers.join(' '), (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve();
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}