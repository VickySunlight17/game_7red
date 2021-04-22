let player = document.regname.regname.value;
let password = document.regpw.regpw.value;
let cardColor = "red"; // объект карты в игре ( ему присваваем цвет)
let cardRank = 0;
let count = 1; // счетчик чтобы правильно расставить карты в палитре
let countMyHand = 1; // счетчик чтобы правильно расставить карты в руке 
let countOpPalette1 = 1; // счетчик чтобы правильно расставить карты в палитре противника1
let parentOpponentPalette; // сюда кладем объект дива, в который будем помещать палитру определенного игрока
let countOpponents = 1; // считаем какой сейчас по порядку из 3ех противников заполняем палитриу
let cardId = 0;
let defenceId = 0; // если нам нужно взять 2 карты
let sendRank = 0;
let sendColor = " ";
let takenCards = [0, 0];
let timerGameInfo = 0;
let resLength = 0;
let clickedPass = 0;

// function pressedCard() {

// }

function continueGame() {
    document.body.style.background = "#FFFFFF";
    document.querySelector('.wrap_content').style.display = "none";
    document.querySelector('.wrapper').style.display = "flex";
    // showGameInfoFunc();

    // switch (fd.get("p3")) {
    //     case 2:
    document.querySelector('.players2').style.display = "flex";
    //     break;
    // case 3:
    //     document.querySelector('.players3').style.display = "flex";
    //     break;
    // case 4:
    //     document.querySelector('.players4').style.display = "flex";
    //     break;
    if (timerGameInfo == 0)
        timerGameInfo = setInterval(showGameInfoFunc, 3000);
    else {
        clearInterval(timerGameInfo);
        timerGameInfo = 0;
    }



}

function showWarning(p) {
    // console.log(p);
    let res = JSON.parse(p.target.response);
    console.log(res);
    // console.log(" мы внутри showwarning");


    if (res.err != null)
        alert(res.err[0]);
    else {
        console.log(JSON.stringify(res));
    }
}
let myCards = document.querySelector('.my__hand__cards');

myCards.onclick = function(event) {
    // let card = event.target.closest('li'); // (1)
    let target = event.target;
    // if (!li) return; // (2)

    takenCards[0] = takenCards[1];

    if (target.value != 0) // если мы попадаем на p
    {
        takenCards[1] = target.value;
        // console.log(target.value, takenCards[1]);
    } else {
        // console.log(target);
        // console.log(target.querySelector('.my__num').value + " это cardId ");
        takenCards[1] = target.querySelector('.my__num').value;
        // console.log(takenCards[1] + " это takenCards[1] кликнутый ");
        // console.log(target.querySelector('.my__num').value + "это takenCards[1] ");
    }
    console.log(takenCards);
    // sendPaletteCard(cardId);
    // if (!myCards.contains(li)) return; // Если таблицы вложенные, event.target может содержать элемент <td>, находящийся вне текущей таблицы. В таких случаях мы должны проверить, действительно ли это <td> нашей таблицы.
};

function sendPaletteCard() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", "4568");
    fd.set("pname", "moveToPalette");
    fd.set("p1", takenCards[1]);
    // console.log(fd.get("p1"));
    // вытащить value из карты и вставить как id чтобы игроку не было его видно
    fd.set("p2", document.regname.regname.value);
    // console.log(fd.get("p2"));
    fd.set("p3", document.regpw.regpw.value);
    // console.log(fd.get("p3"));
    console.log("moveToPalette worked");
    ajax.open("POST", "http://localhost:3000");
    ajax.onload = showWarning;
    // ajax.onerror = showWarning;
    ajax.send(fd);

}

function sendDropCard() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", "4568");
    fd.set("pname", "moveToDrop");
    fd.set("p1", takenCards[1]);
    // вытащить value из карты и вставить как id чтобы игроку не было его видно
    fd.set("p2", document.regname.regname.value);
    fd.set("p3", document.regpw.regpw.value);
    console.log("moveTodrop worked");
    ajax.open("POST", "http://localhost:3000");
    ajax.onload = showWarning;
    // ajax.onerror = showWarning;
    ajax.send(fd);
}

function sendDoubleDropCard() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", "4568");
    fd.set("pname", "doubleDrop");
    fd.set("p1", takenCards[0]);
    fd.set("p2", takenCards[1]);
    // вытащить value из карты и вставить как id чтобы игроку не было его видно
    fd.set("p3", document.regname.regname.value);
    fd.set("p4", document.regpw.regpw.value);
    console.log("doubledrop worked");
    ajax.open("POST", "http://localhost:3000");
    ajax.onload = showWarning;
    // ajax.onerror = showWarning;
    ajax.send(fd);
}

function sendPass() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", "4568");
    fd.set("pname", "pass");
    fd.set("p1", document.regname.regname.value);
    fd.set("p2", document.regpw.regpw.value);

    console.log("pass worked");
    ajax.open("POST", "http://localhost:3000");
    ajax.onload = showWarning;
    // ajax.onerror = showWarning;
    ajax.send(fd);

    clickedPass++;
    for (let i = 1; i < resLength.length; i++) {

        if (resLength[2].login != "defence" && resLength[2].login === resLength[i].login)
            j++;
    }

    if (j === resLength.length) {
        document.querySelector('.shadow2').style.display = "none"; //выиграли
        document.querySelector('.shadow').style.display = "flex"; //выиграли
        clearInterval(timerGameInfo);
        timerGameInfo = 0;
    } else {

        if (clickedPass > 0) { // если нажали на кнопку спасовать
            document.querySelector('.shadow').style.display = "none"; //проиграли

            document.querySelector('.shadow2').style.display = "flex"; // проиграли

            clearInterval(timerGameInfo);
            timerGameInfo = 0;
        }

    }

}

function sendLogout() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", "4568");
    fd.set("pname", "logout");
    fd.set("p1", document.regname.regname.value);
    fd.set("p2", document.regpw.regpw.value);

    console.log("logout worked");
    ajax.open("POST", "http://localhost:3000");
    ajax.onload = showWarning;
    // ajax.onerror = showWarning;
    ajax.send(fd);

    document.querySelector('.wrap_content').style.display = "flex";
    document.querySelector('.enter__name').style.display = "flex";
    document.querySelector('.wrapper').style.display = "none";
    // window.location.reload();
    location = location;
    // document.querySelector('.shadow2').style.display = "flex";
}



function hideExtraCards(cardSelector, count, countMyHand) // присылаю все счетчики, чтобы адекватно скрыть лишние div'ы карт
{
    if (count <= 8) //если у нас выложена не вся палитра
    {
        console.log(count + "число карт в палитре");
        cardSelector = '.my__palette' + count;
        for (; count <= 7; count++) {
            cardSelector = '.my__palette' + count;
            // console.log(cardSelector);
            document.querySelector(cardSelector).style.display = "none";
        }
    }
    if (countMyHand <= 8) //если у нас выложена не вся палитра
    {
        console.log(countMyHand + "число карт у меня в руке");
        cardSelector = '.my__card' + countMyHand;
        for (; countMyHand <= 7; countMyHand++) {
            cardSelector = '.my__card' + countMyHand;
            // console.log(cardSelector);
            document.querySelector(cardSelector).style.display = "none";
        }
    }
    if (countOpPalette1 <= 8) //если у нас выложена не вся палитра
    {
        console.log(countOpPalette1 + "число карт у соперника");
        cardSelector = '.palette__opponent' + countOpPalette1;
        for (; countOpPalette1 <= 7; countOpPalette1++) {
            cardSelector = '.palette__opponent' + countOpPalette1;
            // console.log(cardSelector);
            document.querySelector(cardSelector).style.display = "none";
        }
    }
}

function showRule(color) {
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
                document.querySelector('.the_Rule').innerText = "Больше всего <br> карт разных цветов";
                break;
            }
        case "blue":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#4e59de";
                document.querySelector('.color_of_rule').innerText = "Синее";
                document.querySelector('.the_Rule').innerText = "Больше всего <br> карт разного номинала";
                break;
            }
        case "purple":
            {
                document.querySelector('.rule__box').style.backgroundColor = "#9C51A0";
                document.querySelector('.color_of_rule').innerText = "Фиолетовое";
                document.querySelector('.the_Rule').innerText = "ольше всего <br> карт номиналом меньше 4";
                break;
            }
    }
}

function findColor(color, where) {

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

function showGameInfoGet(p) {

    let res = JSON.parse(p.target.response);
    resLength = res;
    let cardSelector = '.my__card__number' + count;
    let colorSelector = '.my__palette' + count;
    console.log(res);
    document.querySelector('.myName').innerText = document.regname.regname.value;

    // console.log(document.querySelector('.myName').innerText + " our name");

    for (let i = 0; i < res.length; i++) {
        if (res[i].login != document.regname.regname.value && res[i].login != "defence") {
            document.querySelector('.opName1').innerText = res[i].login;
            break;
        }
    }


    if (res.error)
        alert(res.toString);
    else {
        count = 1; // счетчик чтобы правильно расставить карты в палитре
        countMyHand = 1; // счетчик чтобы правильно расставить карты в руке 
        countOpPalette1 = 1; // счетчик чтобы правильно расставить карты в палитре противника1
        countOpponents = 1; // считаем какой сейчас по порядку из 3ех противников заполняем палитриу
        for (let i = 0; i < res.length; i++) {
            // document.getElementsByClassName("test-table")[0].innerHTML += "<br>" + res[i].card_id +
            //     " " + res[i].rank + " " + res[i].color + " " + res[i].login + " " + res[i].place;

            // cardRank = ;

            switch (res[i].place) {

                case "defence":
                    {
                        document.querySelector('.defence__card').innerText = res[i].rank;
                        // document.getElementsByClassName("defence__card")[0].innerText = res[i].rank;
                        // сделать отдельной функцией, тк цвет манго ult else;yj выяснять

                        cardColor = res[i].color;

                        findColor(cardColor, document.querySelector('.defence'));
                        showRule(cardColor);
                        console.log("по цепочке перерисовали карты");
                        // document.getElementsByClassName("defence")[0].style.backgroundColor = res[i].color;
                        break;
                    }
                case "move":
                    {
                        // console.log(" дошли до муве, но чтото пошло не так1");
                        if (res[i].color === document.querySelector('.myName').innerText && res[i].login === document.querySelector('.myName').innerText) // если сейчас наш ход
                        {
                            document.querySelector('.disabled_b').removeAttribute("disabled");
                            // document.querySelector('.b2').removeAttribute("disabled");
                            // document.querySelector('.b3').removeAttribute("disabled");
                            // document.querySelector('.b4').removeAttribute("disabled");



                            // document.querySelector('.button').style.backgroundColor = "#FFFFFF";
                            // document.querySelector('.button').style.border = "#000000";
                            // document.querySelector('.button').style.setProperty("-webkit-filter", "drop-shadow(10px 8px 1px #000000)");
                            document.querySelector('.opName1').style.textDecoration = "none";
                            document.querySelector('.myName').style.textDecoration = "underline";
                            console.log(" дошли до муве, когда НАШ ход");
                        } else { // неактивная кнопка

                            if (res[i].color === document.querySelector('.opName1').innerText && res[i].login === document.querySelector('.opName1').innerText) {
                                document.querySelector('.disabled_b').setAttribute("disabled", "disabled");
                                // document.querySelector('.b2').setAttribute("disabled", "disabled");
                                // document.querySelector('.b3').setAttribute("disabled", "disabled");
                                // document.querySelector('.b4').setAttribute("disabled", "disabled"); // отключить возможность жать на кнопки

                                // document.querySelector('.button').style.backgroundColor = "#a3a3a3";
                                // document.querySelector('.button').style.border = "#a3a3a3";
                                // document.querySelector('.button').style.color = "#FFFFFF";
                                // document.querySelector('.button').style.setProperty("-webkit-filter", "drop-shadow(0px 0px 0px #fff)"); // убираем тень у кнопки
                                document.querySelector('.opName1').style.textDecoration = "underline";
                                document.querySelector('.myName').style.textDecoration = "none";
                                // подсветить имя того игрока, который    ходит
                                console.log(" дошли до муве, когда НЕ наш  ход");
                            }

                        }
                        break;

                    }

                case "palette":

                    {
                        if (res[i].login === document.querySelector('.myName').innerText && count <= 7) // если это наша палитра и число карт в палитре не превышает 8
                        {
                            cardColor = res[i].color;
                            cardRank = res[i].rank; // запомнили данные карты
                            cardSelector = '.my__card__number' + count;
                            colorSelector = '.my__palette' + count;
                            // console.log(cardSelector);
                            document.querySelector(cardSelector).innerText = cardRank;
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, document.querySelector(colorSelector));
                            count++; // увеличиваем count чтобы вставить потом новую карту


                        }
                        // else {
                        //     console.log(" count больше 8! либо не наш игрок пока");
                        //     // count = 1;
                        // }
                        // console.log(document.querySelector('.opName1').innerText);
                        if (res[i].login === document.querySelector('.opName1').innerText && countOpPalette1 <= 7) // если это палитра соперника и число карт в палитре не превышает 8
                        { // нужно чтобы он сравнивал сначала всегда с первым name потом со вторым потом с 3им
                            parentOpponentPalette = document.querySelector('.opponent' + countOpponents);
                            // console.log(document.querySelector('.name'));
                            cardColor = res[i].color;
                            cardRank = res[i].rank; // запомнили данные карты
                            // console.log(cardRank);
                            cardSelector = '.op__card__number' + countOpPalette1;
                            colorSelector = '.palette__opponent' + countOpPalette1;
                            // console.log(cardSelector);
                            parentOpponentPalette.querySelector(cardSelector).innerText = cardRank; //заполняем ток карты определенного оппонента
                            // console.log(parentOpponentPalette.querySelector(cardSelector).innerText);
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, parentOpponentPalette.querySelector(colorSelector));
                            countOpPalette1++; // увеличиваем count чтобы вставить потом новую карту
                            // console.log(res[i].rank);

                        }
                        // else {
                        //     console.log(" count больше 8!");
                        //     // countOpPalette1 = 1;
                        // }
                        break;
                    }
                case "hand":

                    {
                        if (res[i].login === document.querySelector('.myName').innerText && countMyHand <= 7) // если это наша палитра и число карт в палитре не превышает 8
                        {
                            cardColor = res[i].color;
                            cardRank = res[i].rank; // запомнили данные карты
                            cardId = res[i].card_id;
                            // console.log(cardId + " это cardId");
                            cardSelector = '.my__hand__card__number' + countMyHand;
                            colorSelector = '.my__card' + countMyHand;

                            // console.log(cardSelector);
                            document.querySelector(cardSelector).value = cardId;
                            // console.log(document.querySelector(cardSelector).value);
                            // значение в html не записывается, но консоль выводит, что card_id в value есть ( нужно смотреть получится ли его вытащить при отправке id обратно)
                            document.querySelector(cardSelector).innerText = cardRank;
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, document.querySelector(colorSelector));
                            countMyHand++; // увеличиваем count чтобы вставить потом новую карту


                        } else {
                            console.log(" countMyHand больше 8! или что то не так с рукой нашего");
                            // countMyHand = 1;
                        }
                        break;
                    }
            }
        }
        hideExtraCards(cardSelector, count, countMyHand, countOpPalette1);
        let j = 0;
        // смотрим, остался ли один игрок
        for (let i = 1; i < res.length; i++) {

            if (res[2].login != "defence" && res[2].login === res[i].login)
                j++;
        }

        if (j === res.length) {
            document.querySelector('.shadow2').style.display = "none"; //выиграли
            document.querySelector('.shadow').style.display = "flex"; //выиграли
            clearInterval(timerGameInfo);
            timerGameInfo = 0;
        } else {

            if (clickedPass > 0) {
                document.querySelector('.shadow').style.display = "none"; //проиграли

                document.querySelector('.shadow2').style.display = "flex"; // проиграли

                clearInterval(timerGameInfo);
                timerGameInfo = 0;
            }

        }
    }
    // if (timerGameInfo == 0)
    //     timerGameInfo = setInterval(showGameInfoFunc, 3000);
    // else {
    //     clearInterval(timerGameInfo);
    //     timerGameInfo = 0;
    // }
}



function showGameInfoFunc() {
    let ajax = new XMLHttpRequest();
    let fd = new FormData();
    fd.set("db", 4568);
    fd.set("pname", "showGameInfo");
    fd.set("p1", document.regname.regname.value);
    // console.log(fd["p1"]);
    fd.set("p2", document.regpw.regpw.value);
    fd.set("format", "rows");
    // console.log("formData fd создался!");
    ajax.open("POST", "http://localhost:3000");
    console.log("ajaх открылся showGameInfoFunc");
    ajax.onload = showGameInfoGet;
    // console.log("загрузили showGameInfoGet");
    ajax.onerror = showError;
    // console.log("не напортачили с ошибками");
    ajax.send(fd);
    // console.log("ajax отправили!");


}

function showGames(p) {
    let res = JSON.parse(p.target.response);

    console.log(res);
    if (res.toString().substr(1, 5) == "Error")
        alert(res);

    else if (res.error)
        alert(res.toString);
    else
        for (i = 0; i < res.md.length; i++) {
            document.getElementsByClassName("info")[0].innerHTML += "<br>" + res.md[i] +
                " " + res.size[i] + " " + res.have_players[i];
        }
        // document.querySelector('.wrap_content').style.display = "none";
        // document.querySelector('.wrapper').style.display = "flex";
}

let fd = new FormData();

function NumOpps2() {
    fd.set("p3", 2);
    document.getElementById("num_opps").style.display = "none";
    document.getElementById("with_who_play").style.display = "flex";

    console.log(fd.get("p3"));
    // console.log(2);

}

function NumOpps3() {
    fd.set("p3", 3);
    document.getElementById("num_opps").style.display = "none";
    document.getElementById("with_who_play").style.display = "flex";
    fd.set("p3", 3);
    console.log(fd.get("p3"));
}

function NumOpps4() {
    fd.set("p3", 4);
    document.getElementById("num_opps").style.display = "none";
    document.getElementById("with_who_play").style.display = "flex";
    fd.set("p3", 4);
    console.log(fd.get("p3"));
}

function friends() {

    fd.set("p4", 0);
    console.log(fd.get("p4"));
}

function strangers() {

    fd.set("p4", 1);
    console.log(fd.get("p4"));
}

function showCode(p) // выводим полученный хэш игры, либо ошибку
{
    // console.log(p);
    let res = JSON.parse(p.target.response);
    console.log(res);

    if (res.toString().substr(1, 5) == "Error")
        alert(res);

    else if (res.error)
        alert(res.toString);
    else
    // for (i = 0; i < res.md.length; i++) {
        document.getElementsByClassName("code")[0].innerText = res.md[0];
    // }
}

function createGame() {
    let ajax = new XMLHttpRequest();
    let fd = {
        db: "host700505_4568",
        pname: "createGame",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value,
        p3: 2,
        p4: 0
    };

    console.log("you create a game!");

    ajax.open("POST", "http://localhost:3000");
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.onload = showCode;
    ajax.onerror = showError;

    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log("Данные прилетели!");
        }

    }
    ajax.send(JSON.stringify(fd));
}
// очень важная функция, РАботает как обработчик ответа от сразу двух функций и переключает экраны если все хорошо
function showPlayers(p) {
    let res = JSON.parse(p.target.response);

    console.log(res);

    if (res.error) {
        setTimeout(connectedPlayers, 3000);
        alert(res.toString);
    }

    // console.log(fd);
    console.log(fd.get("p3"));

    if (res.length === 0) { // если кол-во игроков совпадает с тем, что надо
        document.body.style.background = "white";
        document.querySelector('.wrap_content').style.display = "none";
        document.querySelector('.wrapper').style.display = "flex";


        document.querySelector('.opponent1').style.display = "flex";
        switch (fd.get("p3")) {
            case 2:
                document.querySelector('.opponent1').style.display = "flex";
                console.log("открыли на двоих");
                break;
            case 3:
                document.querySelector('.players3').style.display = "flex";
                break;
            case 4:
                document.querySelector('.players4').style.display = "flex";
                break;

        }
        if (timerGameInfo == 0)
            timerGameInfo = setInterval(showGameInfoFunc, 3000);
        else {
            clearInterval(timerGameInfo);
            timerGameInfo = 0;
        }


    } else {
        for (i = 0; i < res.length; i++) {
            document.getElementsByClassName("current_players")[0].innerHTML += "<br>" + res[i].login + res[i].num;
        }
        setTimeout(connectedPlayers, 3000);
    }

    // if (res.login[0].length >= 0) {
    //     for (i = 0; i < res.login[0].length; i++) {
    //         document.getElementsByClassName("current_players")[0].innerHTML += "<br>" + res.login[i];
    //     }
    // }
}

function connectedPlayers() {
    let ajax = new XMLHttpRequest();
    let fd = {
        db: "host700505_4568",
        pname: "connectedPlayers",
        p1: document.myCode.innerText,
        format: "rows"
    };

    console.log("you got some players");

    ajax.open("POST", "http://localhost:3000");
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.onload = showPlayers;
    console.log("you connect to a game!");
    ajax.onerror = showError;

    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log("Данные прилетели!");
        }

    }
    ajax.send(JSON.stringify(fd));
}

function showPlayersWehave(p) {
    let res = JSON.parse(p.target.response);
    document.getElementById("enterGame").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
    console.log(res);

    if (res.error)
        alert(res.toString);

    // for (i = 0; i < res.length; i++) {
    //     document.querySelector('.current_players')[0].innerText += "<br>" + res[i].login;
    // }



    setTimeout(connectedPlayers, 3000);
}

function connectGame() {
    let ajax = new XMLHttpRequest();
    let fd = {
        db: "host700505_4568",
        pname: "connectGame",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value,
        p3: document.enterYourCode.enterYourCode.value,
        format: "rows"
    };

    console.log("you connect to a game!");

    ajax.open("POST", "http://localhost:3000");
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.onload = showPlayersWehave;
    // console.log("you connect to a game!");
    ajax.onerror = showError;

    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log("Данные прилетели!");
        }

    }
    ajax.send(JSON.stringify(fd));
}

function showAlert(p) {
    let res = JSON.parse(p.target.response);;
    console.log(JSON.stringify(res));
    // res = res.toString();
    alert(JSON.stringify(res));
}

function sendreg() {
    let ajax = new XMLHttpRequest();
    let fd = {
        db: "host700505_4568",
        pname: "createUser",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value
    };
    // // fd.set("db", "4568");
    // // fd.set("pname", "createUser");
    // // fd.set("p1", document.regname.regname.value);
    // // fd.set("p2", document.regpw.regpw.value);
    // // console.log("good");
    ajax.open("POST", "http://localhost:3000");
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.onload = showAlert;
    ajax.onerror = showError;

    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log("Данные прилетели!");
        }

    }
    ajax.send(JSON.stringify(fd));
    // const headers = {
    //     'Content-Type': 'application/json'
    // }

    // return fetch("http://localhost:3000", {
    //         method: 'POST',
    //         body: JSON.stringify(fd),
    //         headers: headers
    //     }).then(response => {
    //         if (response.ok) {
    //             // console.log(response.json());
    //             const Answer = response.json()
    //             console.log(Answer);
    //             return Answer;
    //         }
    //         return response.json().then(error => {
    //             const e = new Error('что-то пошло не так')
    //             e.data = error
    //             throw e
    //         })
    //     })
    //     .then((data) => console.log(data));
}
// showGameInfoGet(p);

function showError(p) {
    alert(p.target.status);
    alert(JSON.stringify(res))
}