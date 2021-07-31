### API для сервиса поиска фильмов
___
#### Репозиторий: *movies-explorer-api*
___
#### Поддомен сервера: *https://api.beatfilms.greysmouse.nomoredomains.monster*
___
#### Запросы

`POST: /signup {email, password, name}` - регистрация пользователя

`POST: /signin {email, password}` - авторизация пользователя

`POST: /signout {}` - выход из аккаунта (удаление cookie)

`GET: /users/me {}` - получение информации от пользователя (email и name)

`PATCH: /users/me {email, name}` - изменение информации о пользователе (email и name)

`GET: /movies {}` - получение списка сохранённых пользователем фильмов

`POST: /movies {                                      
                country, director,
                duration, year,
                description, image,
                trailer, thumbnail,
                movieId, nameRU,
                nameEN
               }` - добавление фильма в список сохранённых пользователем

`DELETE: /movies/movieId {}` - удаление фильма из списка сохранённых пользователем
