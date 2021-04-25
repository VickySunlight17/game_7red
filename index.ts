let express = require('express')
let port = 3000
const { connection } = require("./database")

let app = express()

app.use(express.json()) // 

app.use(express.urlencoded({ extended: false })) // 

app.use('/', express.static('public')) // подключаем внешние файлы css js, imgs

app.post('/', function (request: { body: { pname: any; p1: any; p2: any; p3: null; p4: null } }, response: { sendStatus: (arg0: number) => any; send: (arg0: any) => void }) {
    if (!request.body) // если не передали никаких данных из формы
        return response.sendStatus(400) // данные не получены

    console.log(" Наши данные: " + JSON.stringify(request.body))

    let queryProcedure = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}")`
    let queryProcedure3 = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}", "${request.body.p3}")`
    let queryProcedure4 = `CALL ${request.body.pname}("${request.body.p1}", "${request.body.p2}", "${request.body.p3}", "${request.body.p4}")`

    if (request.body.p4 != null) {
        connection.query(queryProcedure4, (err: any, res: any[]) => {
            if (err)
                throw err
            console.log(res)
            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит
        })
    } else if (request.body.p3 != null) {
        connection.query(queryProcedure3, (err: any, res: any[]) => {
            if (err)
                throw err
            console.log(res);

            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит
        })
    } else {
        connection.query(queryProcedure, (err: any, res: any[]) => {
            if (err)
                throw err
            console.log(res);

            response.send(res[0]) // отправляем результаты прямо из коллбека, иначе он их в жизни не увидит
        })
    }
})

app.get('/', function (_req: any, res: { sendFile: (arg0: string) => void }) {
    // res.set('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/error', function (_req: any, res: { sendFile: (arg0: string) => void }) {
    // res.set('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/public/error.html")
})

app.listen(port, function (err: any) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}...`)
})