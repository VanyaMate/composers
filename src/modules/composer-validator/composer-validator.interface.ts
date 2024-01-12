export interface IComposerValidator {
    validate (original: string, decomposed: string): boolean;
}