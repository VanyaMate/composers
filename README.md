# Composers

Каждый `IComposer` может использоваться самостоятельно либо в связке с другими. Чтобы объединить несколько `IComposer`
используйте `Composer`.

```typescript
const notationComposer: IComposer  = new NotationComposer(36);
const spaceComposer: IComposer     = new SpaceComposer();
const compositeComposer: IComposer = new Composer([ notationComposer, spaceComposer ]);

const data: string                    = 'строка содержащая числа от 0 до 999 через пробел';
const notationComposedString: string  = notationComposer.compose(data);
const compositeComposedString: string = compositeComposer.compose(data);

// ...
```

<br/>
Так же каждый `IComposer` может использоваться в `IComposerBenchmark`.

```typescript
const benchmark: IComposerBenchmark                   = new ComposerBenchmark([ new DataLossComposerValidator() ]);
const compositeComposeResult: ComposerBenchmarkResult = benchmark.sample('[Notation, Space]', compositeComposedString, [
    {
        title: 'строка для обозначения данных',
        data : 'строка содержащая числа от 0 до 999 через пробел'
    }
]);
```
<br/>
Для красивой визуализации результата бенчмарка есть `IComposerBenchmarkView` а именно `ConsoleComposerBenchmarkView`. Но, если вы хотите, можете спокойно вывести результат в консоль, там обычный объект.

```typescript
const benchmarkView: IComposerBenchmarkView = new ConsoleComposerBenchmarkView({ headerLength: 180 });
benchmarkView.render(compositeComposeResult);
```

## Реализации интерфейса `IComposer`

- `NotationComposer` `[не меняет данные]` переводит все числа в заданую систему счисления для уменьшения количества
  символов
- `RepetitionComposer` `[не меняет данные]` меняет повторяющиеся одинаковые числа (одинарные) на
  формат `.<ПОВТОРЕНИЯ>z<ЧИСЛО>`
- `SpaceComposer` `[не меняет данные]` убирает пробелы, но подходит только в тех случаях, если чанки состоят из 1 или 2
  символов.
- `SumComposer` `[меняет данные]` сортирует числа, каждое число представлено как сумма предыдущих
- `Lzutf8Composer` `[не меняет данные]` сторонняя библиотека для сжатия данных `lzutf8`

## Дополнительные инструменты

- `NumberListFileGenerator (IDataGenerator)` генератор данных (массивов целых чисел) с записыванием их в файл.
  Используется при `npm run generate`.
- `ComposerBenchmark (IComposerBenchmark)` для для получения результатов архивации
- `ConsoleComposerBenchmarkView (IComposerBenchmarkView)` для визуализации результатов в консоли
  ![Пример визуализации](https://sun1-88.userapi.com/impg/FF9t-fmqOnaOvMXv6szAPuDLy-3GAs7yubCrBw/OJ_nA6viWxs.jpg?size=1448x884&quality=96&sign=3c33a7c325f788f66c77ce6f3a33716d&type=album)

## Запуск и генерация

- Для запуска используйте `npm run dev`
- Для запуска тестов используйте `npm run test` или `npm run test:watch`
- Для генерации данных используйте `npm run generate <MIN_NUMBER> <MAX_NUMBER> <AMOUNT> <FILE_NAME>`. Файл попадет в
  /data

