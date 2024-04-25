"use strict"

/***************
 * VARIABLE
 --------------*/

const content = document.querySelector("#content");

/***************
 * FUNCTION
 --------------*/

/*
Requête API au lancement de la page
 */
document.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname.endsWith("index.html")) {
        fetch("https://the-one-api.dev/v2/book")
            .then(response => response.json())
            .then(datas => {
                let bookId = '5cf5805fb53e011a64671582'; //-- Compteur pour l'index de la case générée
                let html = "<ul class='list'>"
                datas.docs.forEach(item => {
                    html += `<li><a href="book.html?index=${item._id}" data-index="${bookId}">${item.name}</a></li>`; //-- Je glisse un index dans l'url de la page pour le reccupérer sur la nouvelle page
                    bookId ++;
                })
                content.innerHTML = html;
            })
            .catch(error => alert("Erreur : " + error));
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('index');
        fetch(`https://the-one-api.dev/v2/book/${index}/chapter`)
            .then(response => response.json())
            .then(datas => {
                let html = "<ol>"
                datas.docs.forEach(item => {
                    html += `<li>${item.chapterName}</li>`;
                })
                content.innerHTML = html;
            })
            .catch(error => alert("Erreur : " + error));
    }
});
