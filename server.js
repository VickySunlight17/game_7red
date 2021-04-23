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

app.post('/', function(req, res) {
    if (!req.body) // если не передали никаких данных из формы
        return res.sendStatus(400) // данные не получены

    // console.log(req.body + " req.body")

    // let Data = JSON.stringify(req.body)
    console.log(" Наши данные: " + JSON.stringify(req.body))

    console.log(req.body.pname);

    let queryProcedure = `CALL ${req.body.pname}("${req.body.p1}", "${req.body.p2}")`
    console.log(queryProcedure);
    connection.query(queryProcedure, function(err, res, field) {
        if (err)
            throw err
        console.log(res)
            // console.log('The solution is: ', rows[0].solution);
    });
    res.send(req.body)
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



let query = "SELECT * FROM players where login=\"v\""
let queryProcedure = "CALL \'pname\' (${p1}, ${p2}, ${p3}, ${p4} )"

// connection.query(query, function(err, res, field) {
//     if (err)
//         throw err
//     console.log(res)
//         // console.log('The solution is: ', rows[0].solution);
// });


// connection.end();