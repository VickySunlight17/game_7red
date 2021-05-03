export function showWarning(res) {
    console.log(res);
    // console.log(" мы внутри showwarning");

    if (res.err != null)
        alert(res.err[0]);
    else {
        console.log(JSON.stringify(res));
    }
}

export function reloadPage(res) {
    console.log(res);

    location = location;
}

export function showRule(color) {
    switch (color) {
        case "red":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#DD2929";
                document.querySelector('.color_of_rule').innerText = "Красное";
                document.querySelector('.the_Rule').innerText = "Старшая карта в палитре";

                break;
            }
        case "orange":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#f06b08";
                document.querySelector('.color_of_rule').innerText = "Оранжевое";
                document.querySelector('.the_Rule').innerText = "Больше всего карт одного номинала";
                break;
            }
        case "yellow":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#F6B417";
                document.querySelector('.color_of_rule').innerText = "Желтое";
                document.querySelector('.the_Rule').innerText = "Больше всего карт одного цвета";
                break;
            }
        case "green":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#0FA858";
                document.querySelector('.color_of_rule').innerText = "Зеленое";
                document.querySelector('.the_Rule').innerText = "Больше всего четных карт";
                break;
            }
        case "light-blue":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#36A7E2";
                document.querySelector('.color_of_rule').innerText = "Голубое";
                document.querySelector('.the_Rule').innerText = "Больше всего карт разных цветов";
                break;
            }
        case "blue":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#4e59de";
                document.querySelector('.color_of_rule').innerText = "Синее";
                document.querySelector('.the_Rule').innerText = "Больше всего карт разного номинала";
                break;
            }
        case "purple":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#9C51A0";
                document.querySelector('.color_of_rule').innerText = "Фиолетовое";
                document.querySelector('.the_Rule').innerText = "ольше всего карт номиналом меньше 4";
                break;
            }
    }
}

export function findColor(color, where) {

    switch (color) {
        case "red":
            {
                where.style.backgroundColor = "#DD2929";
                break;
            }
        case "orange":
            {
                where.style.backgroundColor = "#f06b08";
                break;
            }
        case "yellow":
            {
                where.style.backgroundColor = "#F6B417";
                break;
            }
        case "green":
            {
                where.style.backgroundColor = "#0FA858";
                break;
            }
        case "light-blue":
            {
                where.style.backgroundColor = "#36A7E2";
                break;
            }
        case "blue":
            {
                where.style.backgroundColor = "#4e59de";
                break;
            }
        case "purple":
            {
                where.style.backgroundColor = "#9C51A0";
                break;
            }
    }
}

export function showAlert(p) {

    console.log(p);

}