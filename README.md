# Composers

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

- `DataGenerator (IDataGenerator)` генератор данных (массивов целых чисел)
- `ComposerBenchmark (IComposerBenchmark)` для для получения результатов архивации
- `ConsoleComposerBenchmarkView (IComposerBenchmarkView)` для визуализации результатов в консоли
  ![Пример визуализации](https://sun9-66.userapi.com/impg/pV51KGT9WejRl0pIbYO2J6Ag8Tke29ydkdnBEA/PqLQ7imy76Y.jpg?size=1449x885&quality=96&sign=ba8154723bf4011dfa8680cf24c61432&type=album)

## Запуск и генерация

- Для запуска используйте `npm run dev`.
- Для запуска тестов используйте `npm run test` или `npm run test:watch`
- Для генерации данных используйте `npm run generate <MIN_NUMBER> <MAX_NUMBER> <AMOUNT> <FILE_NAME>`

