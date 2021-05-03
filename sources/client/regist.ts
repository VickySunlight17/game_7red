// кнопки перемещения по меню игры
document.getElementById("create_game").onclick = function () {
    document.getElementById("reg").style.display = "none";
    document.getElementById("code_n").style.display = "flex";
}

let your_name = document.getElementById("enter_your_name"); // что показываем


let nextButton = document.getElementById("next"); // кнопка с далее где ввод имени 
let your_password = document.getElementById("enter_your_password"); // что показываем

nextButton.onclick = function () {
    your_name.style.display = "none";
    your_password.style.display = "flex";
}


let nextpwButton = document.getElementById("nextpw"); // кнопка с далее где ввод пароля
let generic_code = document.getElementById("generic__code"); // что показываем

nextpwButton.onclick = function () {
    your_password.style.display = "none";
    document.getElementById("reg").style.display = "flex";
}


document.getElementById("how_many_players").onclick = function () {
    document.getElementById("code_n").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
}
let enter_gameButton = document.getElementById("enter_game"); // кнопка "Войти в игру"
let enterknowGameCode = document.getElementById("enterGame"); // что показываем (у тебя есть код игры?)

enter_gameButton.onclick = function () {
    document.getElementById("reg").style.display = "none";
    enterknowGameCode.style.display = "flex";
}

let enterGameCode = document.getElementById("enterGame"); // что показываем

let publicGamesShow = document.getElementById("publicGames"); // кнопка нет

document.getElementById("NextName").onclick = function () {
    document.getElementById("enterGame").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
}


function playAgain() {
    document.body.style.background = "#DD2929";
    document.querySelector('.wrapper').style.display = "none";
    document.querySelector('.shadow').style.display = "none";
    document.querySelector('.shadow2').style.display = "none";
    document.querySelector('.enter__name').style.display = "none";

    document.querySelector('.wrap_content').style.display = "flex";
    // document.querySelector('.enter__name').style.display = "flex";
    document.querySelector('.choose_direction').style.display = "flex";
    document.querySelector('.players_counts').style.display = "none";
}

let warningRule = document.querySelector('.warning_box');
let Bwarning = document.querySelector('.warning_button');

Bwarning.onclick = function () {
    warningRule.style.display = "none"; //меняем что-либо в стиле как хотим 
}

function hideWarning() {
    document.querySelector('.shadow_box').style.display = "none";
}