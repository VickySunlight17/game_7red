// let events = require('events')
// let util = require('util')

// let car = function(model) {
//         this.model = model
//     }
//     // создали и отследили события
// util.inherits(car, events.EventEmitter)
// let bmw = new car('bmw')
// let audi = new car('audi')
// let volvo = new car('volvo')

// let cars = [bmw, audi, volvo]
// cars.forEach(function(car) {
//     car.on('speed', function(text) {
//         console.log(car.model + " speed is - " + text)
//     })

// })
// bmw.emit("speed", '254.5 km')
// _____________________________________________чткние файлов____________
let fs = require('fs')

let file_readed = fs.readFileSync('text.txt', 'utf8')
let message = ' Привет, мир\n' + file_readed

// ___________УДАЛЕНИЕ ФАЙЛА

// fs.unlink('text.txt', function() {}) // удаление файла

fs.mkdir('new-one', function() {
    fs.writeFile('./new-one/some.txt', 'ghbdtn? vbh', function() {
        console.log('always ok');

        fs.rmdir('new-one', function() {}) // delete fold
    })
})

// сначала удаляем файлы в папке, потом папку, иначе не удалится!