import { expect, test, describe } from '@jest/globals';
import { IComposer } from '../../../composer.interface';
import { RepetitionStringsComposer } from './repetition-strings';
import { Composer } from '../../../composer';
import { NotationComposer } from '../notation/notation-composer';
import { SpaceComposer } from '../space/space-composer';
import {
    DataLossComposerValidator,
} from '../../../../composer-validator/validators/data-loss-composer-validator';


describe('Repetition String', () => {
    const composer: IComposer                     = new RepetitionStringsComposer(
        new Composer([
            new NotationComposer(36),
            new SpaceComposer(),
        ]),
    );
    const validators: DataLossComposerValidator[] = [
        new DataLossComposerValidator(),
    ];
    const originalString: string                  = '0 0 0 0 0 1 1 1 11 33 0 1 999';
    const composedString: string                  = '6%0^4%1|0B0XRR';
    const decomposedString: string                = '11 33 999 0 0 0 0 0 0 1 1 1 1';

    test('[COMPOSE] Simple random numbers from 0 to 999', () => {
        const composed: string = composer.compose(originalString);
        expect(composed).toBe(composedString);
    });

    test('[DECOMPOSE] Simple random numbers from 0 to 999', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(decomposed).toBe(decomposedString);
    });

    test('[DATA_LOSS] Validators check', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(validators.every((validator) => validator.validate(originalString, decomposed))).toBe(true);
    });
});