import { describe, expect, test } from '@jest/globals';
import { IComposer } from '../../../composer.interface';
import { SpaceComposer } from './space-composer';
import {
    DataLossComposerValidator,
} from '../../../../composer-validator/validators/data-loss-composer-validator';


describe('SpaceComposer', () => {
    const composer: IComposer                     = new SpaceComposer();
    const validators: DataLossComposerValidator[] = [
        new DataLossComposerValidator(),
    ];
    const originalString: string                  = '0 2 23 23 2 0 35 32 11';
    const composedString: string                  = '000223230200353211';

    test('[COMPOSE] String with spaces with solo/double symbols', () => {
        const composed: string = composer.compose(originalString);
        expect(composed).toBe(composedString);
    });

    test('[DECOMPOSE] String with spaces with solo/double symbols', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(decomposed).toBe(originalString);
    });

    test('[DATA_LOSS] Validators check', () => {
        const decomposed: string = composer.decompose(composedString);
        expect(validators.every((validator) => validator.validate(originalString, decomposed))).toBe(true);
    });
});