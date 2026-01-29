# AllBooks

AllBooks es una tienda virtual que vende libros de Casa del Código.
Es un MVP que recién está comenzando y todavía tiene muchas funcionalidades nuevas por desarrollar.

# JSONServer + JWT Auth

Esta es una API Rest mockeada, utilizando json-server y JWT.

## 🛠️ Instalación

```bash
$ npm install
$ npm run start-auth
```

## 🛠️ ¿Cómo registrarse?

Puedes hacer esto realizando una solicitud POST a:

```
POST http://localhost:8000/public/registrar
```

Con los siguientes datos:

```
{
    "nombre": "vinicios neves",
    "correo": "vinicios@alura.com.br",
    "contrasena": "123456",
    "direccion": "Rua Vergueiro, 3185",
    "complemento": "Vila Mariana",
    "codigo_postal": "04101-300"
}
```

Ten en cuenta que el correo electrónico es un campo único y los usuarios con correos duplicados no serán persistidos.

## 🛠️ ¿Cómo iniciar sesión?

Puedes hacer esto realizando una solicitud POST a:

```
POST http://localhost:8000/public/login
```

Con los siguientes datos:

```
{
  "correo": "vinicios@alura.com.br",
  "contrasena": "123456"
}
```

Recibirás un token en el siguiente formato:

```
{
   "access_token": "<ACCESS_TOKEN>",
   "user": { ... datos del usuario ... }
}
```

## ¿Autenticar las próximas requests?

Entonces, agrega este mismo token al header de las próximas solicitudes:

```
Authorization: Bearer <ACCESS_TOKEN>
```
