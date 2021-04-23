let express = require('express')
var mysql = require('mysql')
let port = 3000
let app = express()

app.use(express.json()) // 

app.use(express.urlencoded({ extended: false })) // 

app.use('/', express.static('public')) // подключаем внешние файлы css js, imgs

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "game_7red",
    password: "sinxro2000!"
})


connection.connect(function(err) {
    if (err) {
        return console.error("Ошибка: " + err.message)
    } else {
        console.log("Подключение к серверу MySQL успешно установлено")

    }
})

app.post('/', function(request, response) {
    if (!request.body) // если не передали никаких данных из формы
        return res.sendStatus(400) // данные не получены


    console.log(" Наши данные: " + JSON.stringify(request.body))

    // console.log(req.body.pname);
    let queryProcedure = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}")`
    let queryProcedure3 = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}", "${request.body.p3}")`
    let queryProcedure4 = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}", "${request.body.p3}", "${request.body.p4}")`

    if (request.body.p4 != null) {
        connection.query(queryProcedure4, (err, res) => {
            if (err)
                throw err
            console.log(res)
            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит
        })
    } else if (request.body.p3 != null) {
        connection.query(queryProcedure3, (err, res) => {
            if (err)
                throw err
            console.log(res);

            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит
        })
    } else {
        connection.query(queryProcedure, (err, res) => {
            if (err)
                throw err
            console.log(res);

            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит

        })
    }
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

// connection.end(function(err) {
// if (err) {
//     return console.error("Ошибка: " + err.message)
// } else {
//     console.log("Подключение к серверу MySQL успешно ЗАВЕРШЕНО")

// }
// });