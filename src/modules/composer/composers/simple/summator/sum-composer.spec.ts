import { describe, expect, test } from '@jest/globals';
import { IComposer } from '../../../composer.interface';
import { SumComposer } from './sum-composer';
import {
    DataLossComposerValidator
} from '../../../../composer-validator/validators/data-loss-composer-validator';


describe('SumComposer', () => {
    const composer: IComposer    = new SumComposer();
    const validators: DataLossComposerValidator[] = [
        new DataLossComposerValidator(),
    ];
    const originalString: string = '32 13 99 0 1 0 0 0 1 999';
    const composedString: string = '000010x12x19x67c900';

    test('[COMPOSE] String with spaces with solo/double symbols', () => {
        const composed: string = composer.compose(originalString);
        expect(composed).toBe(composedString);
    });

    test('[DECOMPOSE] String with spaces with solo/double symbols', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(decomposed).toBe(originalString.split(' ').map(Number).sort((a, b) => a - b).map(String).join(' '));
    });

    test('[DATA_LOSS] Validators check', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(validators.every((validator) => validator.validate(originalString, decomposed))).toBe(true);
    });
});