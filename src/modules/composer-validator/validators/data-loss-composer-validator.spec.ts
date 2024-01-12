import { expect, test, describe } from '@jest/globals';
import { IComposerValidator } from '../composer-validator.interface';
import { DataLossComposerValidator } from './data-loss-composer-validator';


describe('DataLossComposerValidator', () => {
    const validator: IComposerValidator = new DataLossComposerValidator();
    const originalString: string        = '32 23 0 11 110';
    const decomposedString: string      = '0 23 32 110 11';


    test('Must be VALID', () => {
        expect(validator.validate(originalString, decomposedString)).toBe(true);
        expect(validator.validate(originalString, originalString)).toBe(true);
    });


    test('Must be INVALID', () => {
        expect(validator.validate(originalString, '23 32 0 12 110')).toBe(false);
        expect(validator.validate(originalString, '23 32 11 110')).toBe(false);
        expect(validator.validate(originalString, '23 32 11 110 0 2')).toBe(false);
    });
});