# Group Buy Platform

Angular-приложение для организации совместных покупок и распределения расходов между участниками.

## Функциональность

- авторизация пользователя;
- просмотр списка совместных покупок;
- создание нового заказа;
- просмотр деталей заказа;
- добавление участников и позиций через mock API;
- расчёт расходов каждого участника;
- отметка статуса оплаты;
- рейтинг участников;
- история завершённых заказов;
- экспорт отчёта по заказу;
- поиск, фильтрация и сортировка заказов.

## Технологии

- Angular 21
- TypeScript
- RxJS
- Angular Signals
- JSON Server
- localStorage
- Angular Router
- HTTP Interceptors
- Guards

## Структура проекта

```text
src/app
  core
    auth
    guards
    interceptors
    services
  features
    orders
    history
    participants
    payments
    ratings
  shared
    models
    components
