export interface IDataGenerator {
    generate (minNumber: number, maxNumber: number, amount: number, fileName: string): Promise<void>;
}