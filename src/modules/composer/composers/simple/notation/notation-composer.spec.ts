import { expect, test, describe } from '@jest/globals';
import { IComposer } from '../../../composer.interface';
import { NotationComposer } from './notation-composer';
import {
    DataLossComposerValidator,
} from '../../../../composer-validator/validators/data-loss-composer-validator';


describe('NotationComposer', () => {
    const composer: IComposer                     = new NotationComposer(36);
    const validators: DataLossComposerValidator[] = [
        new DataLossComposerValidator(),
    ];
    const originalString: string                  = '0 1 10 11 12 0 0 999';
    const composedString: string                  = '0 1 A B C 0 0 RR';

    test('[COMPOSE] Simple random numbers from 0 to 999', () => {
        const composed: string = composer.compose(originalString);
        expect(composed).toBe(composedString);
    });

    test('[DECOMPOSE] Simple random numbers from 0 to 999', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(decomposed).toBe(originalString);
    });

    test('[DATA_LOSS] Validators check', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(validators.every((validator) => validator.validate(originalString, decomposed))).toBe(true);
    });
});