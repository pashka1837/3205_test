# 3205 test task

## Подкотовка:

    склонировать репозиторий

    установить зависимости - npm run install:all

    в ./, ./server, ./frontend переименовать .env.example в  .env

    убедиться, что порты 3000, 3001, 5432 - не заняты

## Docker

    Создать images и запустить докер контейнер - docker compose up

    frontend сервер http://127.0.0.1:3001

    expess server http://localhost:3000

## Tесты

    npm run test

## Детали

    В задании реализованы все пункты. Существует время жизни ссылки, аналитика переходов и запись ip адресов.

    Тесты выполнять при запущенном postgress контейнере.

### Действующие API:

    POST /shorten - возвращает объект {alias, url}

    GET /getall - возвращает все созданные alias: [{alias, url}]

    GET /info/* - возвращает    {
                                    alias,
                                    url,
                                    clickCount,
                                    createdAt
                                }

    GET /analytics/* - возвращает   {
                                        ips: [],
                                        clickCount,
                                    }

    GET /* - редирект на сохраненный url

    DELETE /delete/* - удаляет выбранный alias
