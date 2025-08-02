## Сайт для AITECH
Что сделано:
- [x] Подключено сканирование уязвимостей для безопасной разработки
- [x] Ошибки приведены к единому виду
- [x] Подключены JWT
- [x] Настроено отслеживание дублирующих запросов 
- [x] Настроено логирование в файл
- [x] Настроены индексы
- [x] Настроен Docker
- [x] Настроен Makefile
- [x] Настроен Gunicorn
- [x] Настроены CORS
- [x] Подключена БД Postgres
- [x] Установлен Poetry
- [x] Настроен скрипт запуска
- [x] Настроена django Admin
- [x] Прокомментированы важные аспекты кода
- [x] Добавлен deploy template nginx

# Для запуска проекта локально

Заполнить .env по примеру .env.template

Запустить проект
```bash
docker compose up --build
```

Создание суперпользователя
```bash
docker exec -it <container_name> bash
python manage.py createsuperuser
```

# Для запуска проекта в прод

Заполнить .env.prod по примеру .env.template

Запустить проект
```bash
docker compose -f docker-compose.prod.yml up --build
```
Создание суперпользователя
```bash
docker exec -it <container_name> bash
python manage.py createsuperuser
```

Админка находится по адресу domen/api/admin/

Swagger находится по адресу domen/api/v1/schema/swagger-ui/

Дополнительные команды можно посмотреть в Makefile
