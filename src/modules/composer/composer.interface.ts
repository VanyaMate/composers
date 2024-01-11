export interface IComposer {
    compose (data: string): string;

    decompose (data: string): string;
}