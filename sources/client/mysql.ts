import {
    showWarning,
    reloadPage,
    showRule,
    findColor,
    showAlert
}
    from './showWarning.js';

let cardColor = "red"; // объект карты в игре ( ему присваваем цвет)
let cardRank = 0;
let count = 1; // счетчик чтобы правильно расставить карты в палитре
let countMyHand = 1; // счетчик чтобы правильно расставить карты в руке 
let countOpPalette1 = 1; // счетчик чтобы правильно расставить карты в палитре противника1
let parentOpponentPalette; // сюда кладем объект дива, в который будем помещать палитру определенного игрока
let countOpponents = 1; // считаем какой сейчас по порядку из 3ех противников заполняем палитриу
let cardId = 0;
let takenCards = [0, 0];
let timerGameInfo;
let resLength: string | any[];
let clickedPass = 0;

timerGameInfo = 0;

function continueGame() {
    document.body.style.background = "#FFFFFF";
    document.querySelector('.wrap_content').style.display = "none";
    document.querySelector('.wrapper').style.display = "flex";

    document.querySelector('.players2').style.display = "flex";

    if (timerGameInfo == 0)
        timerGameInfo = setInterval(showGameInfoFunc, 3000);
    else {
        clearInterval(timerGameInfo);
        timerGameInfo = 0;
    }

}


document.querySelector('.my__hand__cards').onclick = function (event) {
    const target = event.target;

    takenCards[0] = takenCards[1];

    if (target.value != 0) // если мы попадаем на p
    {
        takenCards[1] = target.value;
    } else {
        takenCards[1] = target.querySelector('.my__num').value;
    }
    console.log(takenCards);
    // sendPaletteCard(cardId);
    // if (!myCards.contains(li)) return; // Если таблицы вложенные, event.target может содержать элемент <td>, находящийся вне текущей таблицы. В таких случаях мы должны проверить, действительно ли это <td> нашей таблицы.
};

function sendPaletteCard() {
    const fd = {
        db: "host700505_4568",
        pname: "moveToPalette",
        p1: takenCards[1],
        p2: document.regname.regname.value,
        p3: document.regpw.regpw.value
    };
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // console.log(response.json());
            const Answer = response.json()
            console.log(Answer);
            return Answer; //
        }
    })
        .then((data) => {
            console.log(data);
            showWarning(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function sendDropCard() {
    const fd = {
        db: "host700505_4568",
        pname: "moveToDrop",
        p1: takenCards[1],

        p2: document.regname.regname.value,
        p3: document.regpw.regpw.value
    };
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showWarning(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function sendDoubleDropCard() {
    const fd = {
        db: "host700505_4568",
        pname: "doubleDrop",
        p1: takenCards[0],
        p2: takenCards[1],
        p3: document.regname.regname.value,
        p4: document.regpw.regpw.value
    };
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showWarning(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function sendPass() {
    const fd = {
        db: "host700505_4568",
        pname: "pass",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value
    };
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showWarning(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    clickedPass++;
    let j = 0;
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
    const fd = {
        db: "host700505_4568",
        pname: "logout",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value
    };
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {

            return response;
        }
    })
        .then((data) => {
            console.log(data);
            // location = location;
            reloadPage(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}



function hideExtraCards(cardSelector, count, countMyHand) // присылаю все счетчики, чтобы адекватно скрыть лишние div'ы карт
{
    if (count <= 8) //если у нас выложена не вся палитра
    {
        console.log(count + "число карт в палитре");
        cardSelector = '.my__palette' + count;
        for (; count <= 7; count++) {
            cardSelector = '.my__palette' + count;
            document.querySelector(cardSelector).style.display = "none";
        }
    }
    if (countMyHand <= 8) //если у нас выложена не вся палитра
    {
        console.log(countMyHand + "число карт у меня в руке");
        cardSelector = '.my__card' + countMyHand;
        for (; countMyHand <= 7; countMyHand++) {
            cardSelector = '.my__card' + countMyHand;
            document.querySelector(cardSelector).style.display = "none";
        }
    }
    if (countOpPalette1 <= 8) //если у нас выложена не вся палитра
    {
        console.log(countOpPalette1 + "число карт у соперника");
        cardSelector = '.palette__opponent' + countOpPalette1;
        for (; countOpPalette1 <= 7; countOpPalette1++) {
            cardSelector = '.palette__opponent' + countOpPalette1;
            document.querySelector(cardSelector).style.display = "none";
        }
    }
}

function showGameInfoGet(res) {

    resLength = res;
    let cardSelector = '.my__card__number' + count;
    let colorSelector: string | number = '.my__palette' + count;
    console.log(res);
    document.querySelector('.myName').innerText = document.regname.regname.value;


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


            switch (res[i].place) {

                case "defence":
                    {
                        document.querySelector('.defence__card').innerText = res[i].rank;
                        cardColor = res[i].color;

                        findColor(cardColor, document.querySelector('.defence'));
                        showRule(cardColor);
                        console.log("по цепочке перерисовали карты");
                        break;
                    }
                case "move":
                    {
                        // console.log(" дошли до муве, но чтото пошло не так1");
                        if (res[i].color === document.querySelector('.myName').innerText && res[i].login === document.querySelector('.myName').innerText) // если сейчас наш ход
                        {
                            document.querySelector('.disabled_b').removeAttribute("disabled");
                            document.querySelector('.opName1').style.textDecoration = "none";
                            document.querySelector('.myName').style.textDecoration = "underline";
                            console.log(" дошли до муве, когда НАШ ход");
                        } else { // неактивная кнопка

                            if (res[i].color === document.querySelector('.opName1').innerText && res[i].login === document.querySelector('.opName1').innerText) {
                                document.querySelector('.disabled_b').setAttribute("disabled", "disabled");
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
                            document.querySelector(cardSelector).innerText = res[i].rank;
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, document.querySelector(colorSelector));
                            count++; // увеличиваем count чтобы вставить потом новую карту

                        }
                        if (res[i].login === document.querySelector('.opName1').innerText && countOpPalette1 <= 7) // если это палитра соперника и число карт в палитре не превышает 8
                        {
                            parentOpponentPalette = document.querySelector('.opponent' + countOpponents);
                            // console.log(document.querySelector('.name'));
                            cardColor = res[i].color;
                            cardRank = res[i].rank; // запомнили данные карты
                            // console.log(cardRank);
                            cardSelector = '.op__card__number' + countOpPalette1;
                            colorSelector = '.palette__opponent' + countOpPalette1;
                            parentOpponentPalette.querySelector(cardSelector).innerText = cardRank; //заполняем ток карты определенного оппонента
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, parentOpponentPalette.querySelector(colorSelector));
                            countOpPalette1++; // увеличиваем count чтобы вставить потом новую карту

                        }

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
                            document.querySelector(cardSelector).innerText = res[i].rank;
                            document.querySelector(colorSelector).style.display = "flex";
                            findColor(cardColor, document.querySelector(colorSelector));
                            countMyHand++; // увеличиваем count чтобы вставить потом новую карту


                        } else {
                            console.log(" countMyHand больше 8! или что то не так с рукой нашего");
                        }
                        break;
                    }
            }
        }
        hideExtraCards(cardSelector, count, countMyHand);
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
}
function showGameInfoFunc() {
    const fd = {
        db: "host700505_4568",
        pname: "showGameInfo",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value,
        format: "rows"
    };

    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showGameInfoGet(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}
function showGames(p) {
    const res = JSON.parse(p.target.response);

    console.log(res);
    if (res.toString().substr(1, 5) == "Error")
        alert(res);

    else if (res.error)
        alert(res.toString);
    else
        for (let i = 0; i < res.md.length; i++) {
            document.getElementsByClassName("info")[0].innerHTML += "<br>" + res.md[i] +
                " " + res.size[i] + " " + res.have_players[i];
        }
}

function showCode(res) // выводим полученный хэш игры, либо ошибку
{
    console.log(res);

    if (res.toString().substr(1, 5) == "Error")
        alert(res);

    else if (res.error)
        alert(res.toString);
    else
        document.getElementsByClassName("code")[0].innerText = res[0].md;
}

function createGame() {
    const fd = {
        db: "host700505_4568",
        pname: "createGame",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value,
        p3: 2,
        p4: 0
    };

    console.log("you create a game!");
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showCode(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function showPlayers(res) {

    console.log(res);

    if (res.error) {
        setTimeout(connectedPlayers, 3000);
        alert(res.toString);
    }


    if (res.length === 0) { // если кол-во игроков совпадает с тем, что надо
        document.body.style.background = "white";
        document.querySelector('.wrap_content').style.display = "none";
        document.querySelector('.wrapper').style.display = "flex";
        document.querySelector('.opponent1').style.display = "flex";

        if (timerGameInfo == 0)
            timerGameInfo = setInterval(showGameInfoFunc, 3000);
        else {
            clearInterval(timerGameInfo);
            timerGameInfo = 0;
        }


    } else {
        for (let i = 0; i < res.length; i++) {
            document.getElementsByClassName("current_players")[0].innerHTML += "<br>" + res[i].login + res[i].num;
        }
        setTimeout(connectedPlayers, 3000);
    }

}

function connectedPlayers() {
    const fd = {
        db: "host700505_4568",
        pname: "connectedPlayers",
        p1: document.myCode.innerText,
        p2: document.regname.regname.value,
        format: "rows"
    };

    console.log("you got some players");
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showPlayers(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function showPlayersWehave(res) {

    document.getElementById("enterGame").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
    console.log(res);

    setTimeout(connectedPlayers, 3000);
}

function connectGame() {
    const fd = {
        db: "host700505_4568",
        pname: "connectGame",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value,
        p3: document.enterYourCode.enterYourCode.value,
        format: "rows"
    };

    console.log("you connect to a game!");
    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const Answer = response;
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showPlayersWehave(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}



function sendreg() {
    const fd = {
        db: "host700505_4568",
        pname: "createUser",
        p1: document.regname.regname.value,
        p2: document.regpw.regpw.value
    };

    fetch("http://localhost:3000", {
        method: 'POST',
        body: JSON.stringify(fd),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log(response);
            const Answer = response.json()
            console.log(Answer);
            return Answer;
        }
    })
        .then((data) => {
            console.log(data);
            showAlert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
