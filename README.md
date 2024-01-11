# Composers

## Реализации интерфейса `IComposer`

- `NotationComposer` `[не меняет данные]` переводит все числа в заданую систему счисления для уменьшения количества
  символов
- `RepetitionComposer` `[не меняет данные]` меняет повторяющиеся одинаковые числа (одинарные) на
  формат `.<ПОВТОРЕНИЯ>z<ЧИСЛО>`
- `SpaceComposer` `[не меняет данные]` убирает пробелы, но подходит только в тех случаях, если чанки состоят из 1 или 2
  символов.
- `SumComposer` `[меняет данные]` сортирует числа, каждое число представлено как сумма предыдущих

## Дополнительные инструменты

- `DataGenerator (IDataGenerator)` генератор данных (массивов целых чисел)
- `ComposerBenchmark (IComposerBenchmark)` для для получения результатов архивации
- `ConsoleComposerBenchmarkView (IComposerBenchmarkView)` для визуализации результатов в консоли
  ![Пример визуализации](https://sun9-25.userapi.com/impg/qpvJp5Sr80v_AnjD_ItvXaNnyfDwiTllpi1QTQ/SceYshWBAJQ.jpg?size=1458x437&quality=96&sign=d1c25e33bdf6309b7b1c0e69af274b19&type=album)

## Запуск и генерация

- Для запуска используйте `npm run dev`.
- Для генерации данных используйте `npm run generate <MIN_NUMBER> <MAX_NUMBER> <AMOUNT> <FILE_NAME>`

