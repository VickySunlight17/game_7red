// Дополнительные кнопки, чтобы было видно как в игре выглядит окошко лузера и победителя

var myclose = document.getElementById("close"); //помещаем в переменную наш элемент
var mywinner = document.getElementById("winner"); //помещаем в переменную наш элемент
var myclose2 = document.getElementById("close2"); //помещаем в переменную наш элемент
var myshow2 = document.getElementById("show2"); //помещаем в переменную наш элемент

var jsshadow = document.getElementById("sh");
var jsshadow2 = document.getElementById("loser");

// myshow2.onclick = function () {

//     jsshadow2.style.display = "flex";
// }

// myclose2.onclick = function() {
//     jsshadow2.style.display = "none"; //меняем что-либо в стиле как хотим 
// }
// mywinner.onclick = function() {
//     jsshadow.style.display = "flex"; //меняем что-либо в стиле как хотим 
// }

// myclose.onclick = function() {
//     jsshadow.style.display = "none"; //меняем что-либо в стиле как хотим 
// }

// let closeShadowWarning = document.getElementById("shadow_box");

// closeShadowWarning.onclick = function () {
//     closeShadowWarning.style.display = "none";
// }
var warningRule = document.querySelector('.warning_box');
var Bwarning = document.querySelector('.warning_button');

Bwarning.onclick = function() {
    warningRule.style.display = "none"; //меняем что-либо в стиле как хотим 
}

function hideWarning() {
    document.querySelector('.shadow_box').style.display = "none";
}