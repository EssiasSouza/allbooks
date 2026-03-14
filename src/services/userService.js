const { userDB } = require('../config/database')

function usuarioExiste(email, password, database = userDB) {
    return database.usuarios.findIndex(user => user.email === email && Number(user.password) === Number(password)) !== -1
}

function emailExiste(email, database = userDB) {
    return database.usuarios.findIndex(user => user.email === email) !== -1
}



module.exports = { usuarioExiste, emailExiste }