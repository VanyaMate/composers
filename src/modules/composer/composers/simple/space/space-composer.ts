import { IComposer } from '../../../composer.interface';


export class SpaceComposer implements IComposer {
    compose (data: string): string {
        const chunks: string[] = data.split(/\s/g);
        return chunks.reduce(
            (acc, chunk) => acc += chunk.length === 1 ? `0${ chunk }` : chunk, '',
        );
    }

    decompose (data: string): string {
        const chunks: string[] = data.match(/.{2}/g);
        return chunks
            .reduce(
                (acc, chunk) => {
                    acc.push(chunk[0] === '0' ? chunk[1] : chunk);
                    return acc;
                }, [])
            .join(' ');
    }
}