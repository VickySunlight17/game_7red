let express = require('express')
var mysql = require('mysql')
let port = 3000
let app = express()

app.use(express.json()) // 

app.use(express.urlencoded({ extended: false })) // 

app.use('/', express.static('public')) // подключаем внешние файлы css js, imgs

app.post('/', function(req, res) {
    if (!req.body) // если не передали никаких данных из формы
        return res.sendStatus(400) // данные не получены
    console.log(req.body + " req.body")
    let Data = JSON.stringify(req.body)
    console.log(Data)
    res.send(Data)
        // create user in req.body
})

app.get('/', function(req, res) {
    // res.set('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/error', function(req, res) {
    // res.set('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/public/error.html")
})

app.listen(port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}...`)
})

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "host700505_4568",
    password: "sinxro2000!"
})

connection.connect(function(err) {
    if (err) {
        return console.error("Ошибка: " + err.message)
    } else {
        console.log("Подключение к серверу MySQL успешно установлено")

    }
})

let query = "SELECT * FROM players"

connection.query(query, function(err, res, field) {
    if (err)
        throw err
    console.log(res)
        // console.log('The solution is: ', rows[0].solution);
});

connection.end();