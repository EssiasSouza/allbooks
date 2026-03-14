const jsonServer = require('json-server')
const server = jsonServer.create()
const fs = require('fs')

const { emailExiste, usuarioExiste } = require('../services/userService')
const { createToken } = require('../services/authService')
let { userDB } = require('../config/database')

server.post('/cadastrar', async (req, res) => {
    const { email, password, nombre, direccion, complemento, cep } = req.body;

    if (emailExiste(email)) {
        const status = 401;
        const message = '¡El e-mail ya fue utilizado!';
        return res.status(status).json({ status, message });

    }

    fs.readFile("./src/data/usuarios.json", (err, data) => {
        if (err) {
            const status = 401
            console.log(err)
            const message = err
            return res.status(status).json({ status, message })

        };


        const json = JSON.parse(data.toString());

        const last_item_id = json.usuarios.length > 0 ? json.usuarios[json.usuarios.length - 1].id : 0;

        json.usuarios.push({ id: last_item_id + 1, email, password, nombre, direccion, complemento, cep });

        fs.writeFile("./src/data/usuarios.json", JSON.stringify(json), (err) => {
            if (err) {
                const status = 401
                const message = err
                return res.status(status).json({ status, message })

            }
        });
        userDB = json
    });

    const access_token = createToken({ email, password })
    return res.status(200).json({ access_token })
})

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!usuarioExiste(email, password)) {
        const status = 401
        const message = '¡E-mail o contraseña incorrectos!'
        res.status(status).json({ status, message })
        return
    }
    const access_token = createToken({ email, password })
    let user = { ...userDB.usuarios.find(user => user.email === email && user.password === password) }
    delete user.password
    res.status(200).json({ access_token, user })
})

server.get('/lancamentos', (req, res) => {
    res.status(200).json([
        {
            "id": 4,
            "categoria": 3,
            "titulo": "Bootstrap 4",
            "slug": "bootstrap-4",
            "descricao": "Conozca la biblioteca front-end más utilizada del mundo",
            "isbn": "978-85-94188-60-1",
            "numeroPaginas": 172,
            "publicacao": "2018-05-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/bootstrap4.png",
            "autor": 4,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "Hacer un sitio elegante nunca fue tan fácil, incluso para quienes no saben escribir una línea de CSS y mucho menos entienden cómo armonizar colores, equilibrar elementos y tipografía. Bootstrap es, en resumen, un gran archivo CSS con una excelente documentación que posee decenas y decenas de componentes listos. Al principio fue creado por Twitter para servir como una guía de estilos en CSS de la empresa; hoy es la biblioteca más famosa y utilizada en el mundo."
        },
        {
            "id": 5,
            "categoria": 3,
            "titulo": "Cangaceiro JavaScript",
            "slug": "cangaceiro-javascript",
            "descricao": "Una aventura en el sertón de la programación",
            "isbn": "978-85-94188-00-7",
            "numeroPaginas": 502,
            "publicacao": "2017-08-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/cangaceirojavascript.png",
            "autor": 5,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "Tal vez ninguna otra lengua haya logrado invadir el imaginario colectivo de los desarrolladores como lo hizo JavaScript. En su historia fabulosa en busca de identidad, fue la única que logró arraigarse en los navegadores, convirtiéndose en un lenguaje en el que todo desarrollador necesita tener algún nivel de conocimiento."
        },
        {
            "id": 6,
            "categoria": 3,
            "titulo": "CSS Eficiente",
            "slug": "css-eficiente",
            "descricao": "Técnicas y herramientas que marcan la diferencia en tus estilos",
            "isbn": "978-85-5519-076-6",
            "numeroPaginas": 144,
            "publicacao": "2015-06-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/css.png",
            "autor": 6,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "Cuando aprendemos a trabajar con CSS, frecuentemente nos encontramos perdidos en detalles fundamentales que no nos son explicados. A veces, algunos de estos detalles pasan desapercibidos incluso para el desarrollador front-end más experimentado. Pero ¿cómo ir más allá del conocimiento básico de CSS y preparar el camino para explorar temas más avanzados?"
        }
    ])
})

server.get('/mas-vendidos', (req, res) => {
    res.status(200).json([
        {
            "id": 1,
            "categoria": 3,
            "titulo": "Accesibilidad en la Web",
            "slug": "acessibilidade-en-la-web",
            "descricao": "Buenas prácticas para construir sitios y aplicaciones accesibles",
            "isbn": "978-65-86110-10-4",
            "numeroPaginas": 246,
            "publicacao": "2020-04-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/acessibilidade.png",
            "autor": 1,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "La accesibilidad en la Web consiste en eliminar las barreras de acceso en páginas y aplicaciones digitales para que las personas con discapacidad tengan autonomía en la red. En realidad, la accesibilidad web beneficia a todas las personas. En algún momento de la vida todos pueden necesitar accesibilidad, ya sea debido a una limitación temporal o permanente. Cuando no consideramos el acceso de personas con discapacidad, estamos quitando el derecho de una persona a navegar, interactuar o consumir productos y servicios en la red. La empatía es el factor principal para que las aplicaciones que desarrollamos sean inclusivas."
        },
        {
            "id": 2,
            "categoria": 3,
            "titulo": "Angular 11 y Firebase",
            "slug": "angular11-y-firebase",
            "descricao": "Construyendo una aplicación integrada con la plataforma de Google",
            "isbn": "978-85-7254-036-0",
            "numeroPaginas": 163,
            "publicacao": "2019-11-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/angular.png",
            "autor": 2,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "En el desarrollo de aplicaciones web y móviles, existe una gran cantidad de lenguajes, frameworks y herramientas disponibles. En medio de esta inmensidad, es común cuestionarse o incluso sentir inseguridad sobre cuál es el mejor camino para la construcción en este segmento. Angular es una plataforma que facilita la construcción de aplicaciones, combinando plantillas, inyección de dependencias y todo integrado a las mejores prácticas de desarrollo."
        },
        {
            "id": 3,
            "categoria": 1,
            "titulo": "Arquitectura de software distribuido",
            "slug": "arquitectura-de-software-distribuído",
            "descricao": "Buenas prácticas para un mundo de microservicios",
            "isbn": "978-65-86110-86-9",
            "numeroPaginas": 138,
            "publicacao": "2021-10-01",
            "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/arquitetura.png",
            "autor": 3,
            "opcoesCompra": [
                {
                    "id": 1,
                    "titulo": "E-book",
                    "preco": 29.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                },
                {
                    "id": 2,
                    "titulo": "Impreso",
                    "preco": 39.9
                },
                {
                    "id": 3,
                    "titulo": "E-book + Impreso",
                    "preco": 59.9,
                    "formatos": [
                        ".pdf",
                        ".pub",
                        ".mob"
                    ]
                }
            ],
            "sobre": "Con constantes evoluciones, adición de nuevas funcionalidades e integraciones con otros sistemas, los softwares se han vuelto cada vez más complejos y más difíciles de entender. De esta forma, lograr que los costos de mantenimiento de estos softwares no superen el valor que entregan a las compañías es un desafío para la arquitecta o el arquitecto de software."
        }
    ])
})

module.exports = server