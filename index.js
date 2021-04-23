const http = require('http') // создание http
const fs = require('fs') // работа с файловой системой
const path = require('path') // для правильного написания пути к файлу
    // const mysql = require('mysql') // для работы с бд
const { parse } = require('querystring')
    // const bodyParser = require('body-parser') // парсит json
    // req информаци, которая поступает на сервер
    // response  ответ сервера

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    const ext = path.extname(filePath)

    let contentType = 'text/html'
    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/js'
            break
        default:
            contentType = 'text/html'

    }
    if (!ext) {
        filePath += '.html'
    }
    // console.log(req.method)
    // console.log(filePath)
    if (req.method == 'POST') {
        console.log(req.method)

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', () => {
            console.log(body)
            console.log(req.method)
            let params = parse(body)
            console.log("Это параметры, что пришли: " + params)
                // console.log("Это имя: " + params.p1)
                // res.end('ok') //не нужно писать, вываливает ошибку
        });

    }
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    })
                    res.end(data)
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })


    // res.end()
})

server.listen(3000, () => {
    console.log('сервер начат на порту 3000....')
})

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "host700505_4568",
//     password: "sinxro2000!"
// });

// connection.connect(function(err) {
//     if (err) {
//         return console.error("Ошибка: " + err.message);
//     } else {
//         console.log("Подключение к серверу MySQL успешно установлено");

//     }
// });

// connection.end(err => {
//     if (err) {
//         console.log(err);
//         return err;
//     } else {
//         console.log('Подключение к серверу MySQL успешно ЗАВЕРШЕНО');
//     }
// });