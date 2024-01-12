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
  ![Пример визуализации](https://sun1-88.userapi.com/impg/FF9t-fmqOnaOvMXv6szAPuDLy-3GAs7yubCrBw/OJ_nA6viWxs.jpg?size=1448x884&quality=96&sign=3c33a7c325f788f66c77ce6f3a33716d&type=album)

## Запуск и генерация

- Для запуска используйте `npm run dev`.
- Для запуска тестов используйте `npm run test` или `npm run test:watch`
- Для генерации данных используйте `npm run generate <MIN_NUMBER> <MAX_NUMBER> <AMOUNT> <FILE_NAME>`

