### Создать images и запустить докер контейнер - docker compose up

### Запуск тестов - npm run test

### В задании реализованы все пункты. Существует время жизни ссылки, аналитика переходов и записи ip адресов

### Действующие API:

    POST /shorten - возвращает объект {newUrl:string}
    GET /getall - возвращает все созданные юрлы
    GET /info/* - возвращает    {
                                    originalUrl: string,
                                    createdAt: number,
                                    clickCount: number,
                                }
    GET /analytics/* - возвращает   {
                                        analytics: string[],
                                        clickCount: number,
                                    }
    GET /* - редирект на созраненный url
    DELETE /delete/* - удаляет выбранный укороченный url
