import { describe, expect, test } from '@jest/globals';
import { IComposer } from '../../../composer.interface';
import { RepetitionComposer } from './repetition-composer';
import {
    DataLossComposerValidator
} from '../../../../composer-validator/validators/data-loss-composer-validator';


describe('RepetitionComposer', () => {
    const composer: IComposer    = new RepetitionComposer();
    const validators: DataLossComposerValidator[] = [
        new DataLossComposerValidator(),
    ];
    let originalString: string   = '';
    originalString += '0'.repeat(3);
    originalString += '1';
    originalString += '0'.repeat(7);
    originalString += 1;
    originalString += '0'.repeat(444);
    originalString += '123';
    const composedString: string = '00017!01.444!0123';

    test('[COMPOSE] String with repeats', () => {
        const composed: string = composer.compose(originalString);
        expect(composed).toBe(composedString);
    });

    test('[DECOMPOSE] String with repeats', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(decomposed).toBe(originalString);
    });

    test('[DATA_LOSS] Validators check', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(validators.every((validator) => validator.validate(originalString, decomposed))).toBe(true);
    });
});