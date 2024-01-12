import { IComposerValidator } from '../composer-validator.interface';


export class DataLossComposerValidator implements IComposerValidator {
    validate (original: string, decomposed: string): boolean {
        const originalNumbers: number[]   = original.split(' ').map(Number).sort((a, b) => a - b);
        const decomposedNumbers: number[] = decomposed.split(' ').map(Number).sort((a, b) => a - b);
        for (let i = 0; i < originalNumbers.length; i++) {
            if (originalNumbers[i] !== decomposedNumbers[i]) {
                return false;
            }
        }
        return true;
    }
}