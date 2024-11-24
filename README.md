**Задание 1.**

Создать модуль для регистрации (signup) и аутентификации (signin) пользователей (AuthModule). После аутентификации пользователя необходимо генерировать **JSON Web Token (JWT)** и возвращать его на клиент. **JWT payload** должен содержать структуру данных:

```javascript
{
  id: "string", // id пользователя
  email: "string", // email пользователя
  firstName: "string" // firstName пользователя
}
```

**Методы**
|Метод	   |URL	                   |Действие	                  |Комментарий                                                             |
|----------|-----------------------|----------------------------|------------------------------------------------------------------------|
|```POST```|```/api/users/signup```|Регистрация пользователей	  |Для регистрации пользователей необходимо использовать структуру данных: ```{ email: "string", password: "string", firstName: "string", lastName: "string" }```|
|```POST```|```/api/users/signin```|Аутентификация пользователей|Для аутентификации пользователей необходимо использовать структуру данных: ```{ email: "string", password: "string" }```|

*Опционально: зарегистрированные пользователи должны сохраняться в MongoDB.*

**Задание 2.**

Создать собственную стратегию **JWT** с использованием **Passport**. **JWT**-секрет неоходимо хранить в .env-файле.

**Задание 3.**

Создать авторизационный **Guard** с использованием реализованной стратегии **JWT**. Подключить авторизационный **Guard** к контроллерам для авторизации пользовательских запросов.

:white_check_mark: **РЕШЕНИЕ**

**1. Создать нового пользователя SIGNUP**

```javascript
POST http://localhost:3000/api/users/signup 

{
    "email": "yuriy@mail.ru",
    "password": "3",
    "firstName": "Yuriy",
    "lastName" : "Sharapov"
}
```

**2. Авторизоваться под пользователем**

```javascript
POST http://localhost:3000/api/users/signin

{
    "email"    : "yuriy@mail.ru",
    "password" : "3"
}
```

На выходе получаем **JWT-токен** (например)
```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6Inl1cml5QG1haWwucnUiLCJmaXJzdE5hbWUiOiJZdXJpeSIsImlhdCI6MTczMjQ4OTI4NCwiZXhwIjoxNzMyNDkyODg0fQ.b2zsbw9Y-cYnsBRUfunCNk-FYl3wN_XNWKnyx9xAhgE```

**3. Получить информацию о пользователе под защитой JWT-токена** 

```javascript
GET http://localhost:3000/api/users/profile
```

В заголовке указать Barer Token ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6Inl1cml5QG1haWwucnUiLCJmaXJzdE5hbWUiOiJZdXJpeSIsImlhdCI6MTczMjQ4OTI4NCwiZXhwIjoxNzMyNDkyODg0fQ.b2zsbw9Y-cYnsBRUfunCNk-FYl3wN_XNWKnyx9xAhgE```

На выходе получаем
```javascript
{
    "id": "3",
    "email": "yuriy@mail.ru",
    "firstName": "Yuriy",
    "iat": 1732489284,
    "exp": 1732492884
}
```