export { }
let mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "game_7red",
    password: "sinxro2000!"
})


connection.connect(function (err: { message: string }) {
    if (err) {
        return console.error("Ошибка: " + err.message)
    } else {
        console.log("Подключение к серверу MySQL успешно установлено")

    }
})

// connection.end(function(err) {
// if (err) {
//     return console.error("Ошибка: " + err.message)
// } else {
//     console.log("Подключение к серверу MySQL успешно ЗАВЕРШЕНО")

// }
// });
module.exports.connection = connection;