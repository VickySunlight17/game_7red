// кнопки перемещения по меню игры

var myreg = document.getElementById("reg"); // что прячем
var mywinner = document.getElementById("num_opps"); //что показываем

var create = document.getElementById("create_game"); // кнопка создать игру
// переходим на выбор кол-ва оппонентов:

document.getElementById("create_game").onclick = function() {
    document.getElementById("reg").style.display = "none";
    document.getElementById("num_opps").style.display = "flex";
}

var players_2 = document.getElementById("players2"); // кнопка с номером 2
var players_3 = document.getElementById("players3"); // кнопка с номером 2
var players_4 = document.getElementById("players4"); // кнопка с номером 2

var who_play = document.getElementById("with_who_play"); // что показываем
// переходим на выбор кол-ва оппонентов:

players_2.onclick = function() {
    document.getElementById("num_opps").style.display = "none";
    who_play.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

// players_3.onclick = function() {
//     document.getElementById("num_opps").style.display = "none";
//     who_play.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то лиюо сделать так, чтобы вел в конце на стр где 3 игрока
// }
// players_4.onclick = function() {
//     document.getElementById("num_opps").style.display = "none";
//     who_play.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то,лиюо сделать так, чтобы вел в конце на стр где 4 игрока
// }

var friends = document.getElementById("with_friends"); // кнопка с друзьями
var your_name = document.getElementById("enter_your_name"); // что показываем

friends.onclick = function() {
    who_play.style.display = "none";
    generic_code.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

var strangers = document.getElementById("with_strangers"); // кнопка с незнакомцем 
var your_name = document.getElementById("enter_your_name"); // что показываем

document.getElementById("with_strangers").onclick = function() {
    who_play.style.display = "none";
    generic_code.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

var nextButton = document.getElementById("next"); // кнопка с далее где ввод имени 
var your_password = document.getElementById("enter_your_password"); // что показываем

nextButton.onclick = function() {
    your_name.style.display = "none";
    your_password.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

var nextpwButton = document.getElementById("nextpw"); // кнопка с далее где ввод пароля
var generic_code = document.getElementById("generic__code"); // что показываем

nextpwButton.onclick = function() {
    your_password.style.display = "none";
    myreg.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

var nextGenButton = document.getElementById("next_Gen_Button"); // кнопка с далее где анимация шестеренки 
// нужно сделать так чтобы он выводил шестеренки пока ждем ответа от бд
var code_N = document.getElementById("code_n"); // что показываем

document.getElementById("next_Gen_Button").onclick = function() {
    document.getElementById("generic__code").style.display = "none";
    code_N.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

document.getElementById("how_many_players").onclick = function() {
    document.getElementById("code_n").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}
var enter_gameButton = document.getElementById("enter_game"); // кнопка "Войти в игру"
var enterknowGameCode = document.getElementById("enterGame"); // что показываем (у тебя есть код игры?)

enter_gameButton.onclick = function() {
    myreg.style.display = "none";
    enterknowGameCode.style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
}

// var yesButton = document.getElementById("yesCode"); // кнопка да 
var enterGameCode = document.getElementById("enterGame"); // что показываем

// yesButton.onclick = function() {
//     enterknowGameCode.style.display = "none";
//     enterGameCode.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то
// }

// var noButton = document.getElementById("noCode"); // кнопка нет
var publicGamesShow = document.getElementById("publicGames"); // кнопка нет

// noButton.onclick = function() {
//     enterknowGameCode.style.display = "none";
//     publicGames.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то
// }

// var nextNoButton = document.getElementById("nextFromNo"); // кнопка нет

// nextNoButton.onclick = function() {
//     publicGamesShow.style.display = "none";
//     enterGameCode.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то
// }

var enter_gameButton = document.getElementById("NextName"); // кнопка "Далее " где вводим код
var enterMyNameButton = document.getElementsByClassName("players_count")[0]; // кнопка "Далее " где вводим код

document.getElementById("NextName").onclick = function() {
    document.getElementById("enterGame").style.display = "none";
    document.getElementById("players_count").style.display = "flex";
    // поменять экран в игре с кол-вом игроков как то
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

    // document.body.style.backgroundImage = "url(../imgs/bgrnd.png)";

    // document.body.style.background = "#DD2929";
    // document.body.style.background = "url(../imgs/bgrnd.png)";


}
// поменять экран в игре с кол-вом игроков как то


// enter_gameButton.onclick = function () {
//     enterGameCode.style.display = "none";
//     enterMyNameButton.style.display = "flex";
//     // поменять экран в игре с кол-вом игроков как то
// }