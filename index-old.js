// (function(exports, require, __dirname, __filename) {
// const chalk = require('chalk')
// const text = require('./data')
// console.log(chalk.blue(text))

// console.log(__filename)

// })

const http = require('http')
const fs = require('fs')
const path = require('path')

// req информаци, которая поступает на сервер
// response  ответ сервера
const server = http.createServer((req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // })


    // console.log(req.url)

    //     if (req.url === '/') {
    //         fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //             //    берем путь до нужного файла. который хотим показать1ъ
    //             if (err) {
    //                 throw err
    //             }

    //             res.writeHead(200, {
    //                 'Content-Type': 'text/html'
    //             })
    //             res.end(data)
    //         })
    //     } else // ЕСЛИ ХОТИМ ПОКАЗАТЬ ДРУГОЙ ФАЙЛ
    //     if (req.url === '/contact') {
    //         fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
    //             //    берем путь до нужного файла. который хотим показать1ъ
    //             if (err) {
    //                 throw err
    //             }

    //             res.writeHead(200, {
    //                 'Content-Type': 'text/html'
    //             })
    //             res.end(data)
    //         })
    //     }

    //     // res.end('<h1> hello nodejs !!!</h1>')

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

    // console.log(filePath)

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
                'Content-Type': 'text/html'
            })
            res.end(content)
        }
    })

    // res.end()
})

// const PORT process.env.PORT || 3000



server.listen(3000, () => {
    console.log('сервер начат на порту 3000....')
})