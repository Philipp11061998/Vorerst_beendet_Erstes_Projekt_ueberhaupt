import { values, Standorte, changeStandort } from '../Werte.js';
import { Startpunkt } from './ScriptsLG/Startpunkt/Startpunkt.js';
import { StadtOW } from './ScriptsLG/Stadt/Overworld.js';
import { Taverne } from './ScriptsLG/Stadt/Taverne.js';
import { Quests, Questexe } from '../Quests.js';
import { TorbogenWest } from './ScriptsLG/Stadt/TorbogenWest.js';
import { TorbogenOst } from './ScriptsLG/Stadt/TorbogenOst.js';

document.addEventListener("DOMContentLoaded", function () {
    const Werte = document.getElementById("WerteMenu");
    let Adminfromlocalstorage = localStorage.getItem('Admin');
    const Geschlechtfromlocalstorage = localStorage.getItem('Geschlecht');

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

    disableAllButtons();

    updateValuesFromLocalStorage()

    Admin();
    
    function Admin(){
        if (Adminfromlocalstorage === "135792468"){
        document.getElementById("AdminTools").style.display="block";
        document.getElementById("LocationSP").style.display="block";
        document.getElementById("LocationSO").style.display="block";
        document.getElementById("LocationT").style.display="block";
        }
    }

    if (maxStandort === 'Startpunkt') {
        Button1Funktionen("Startpunkt");
        
    } else if (maxStandort === "Stadt") {
        Button1Funktionen("Stadt");
    } else if (maxStandort === "Taverne") {
        Button1Funktionen("Taverne");
    } else if (maxStandort === "TorbogenWest"){
        Button1Funktionen("TorbogenWest");
    } else if (maxStandort === "TorbogenOst"){
        Button1Funktionen("TorbogenOst");
    }

    // Funktion zum Aktualisieren der Werte basierend auf dem LocalStorage
    function updateValuesFromLocalStorage() {
        const charismaFromLocalStorage = localStorage.getItem('Charisma');
        const usernameFromLocalStorage = localStorage.getItem('username');

        if (charismaFromLocalStorage !== null) {
            values.Charisma = parseInt(charismaFromLocalStorage);
        }

        if (usernameFromLocalStorage !== null) {
            values.username = usernameFromLocalStorage;
        }

        // Aktualisiere maxStandort
        maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

        // Aktualisiere die Anzeige der Werte
        document.getElementsByClassName("CharismaWert")[0].innerHTML = values.Charisma;
        document.getElementsByClassName("NameWert")[0].innerHTML = values.username;
        document.getElementsByClassName("StandortWert")[0].innerHTML = maxStandort;
    }

    // Füge einen Event Listener hinzu, um auf Änderungen im LocalStorage zu reagieren
    window.addEventListener('storage', function (e) {
        // Überprüfe, ob sich der LocalStorage-Wert geändert hat
        if (e.key === 'Charisma' || e.key === 'username') {
            // Aktualisiere die Werte
            updateValuesFromLocalStorage();
        }
    });   

    document.getElementById("Menü").addEventListener("click", function(){
        let collapseQ = document.getElementById("Quests");
        let collapseAdmin = document.getElementById("AdminTools");

        if (!collapseQ.classList.contains("collapsed")){
            collapseQ.click();
        }
        if (!collapseAdmin.classList.contains("collapsed")){
            collapseAdmin.click();
        }

    });

    document.getElementById("Quests").addEventListener("click", function(){
        const Quest1FromLocalStorage = localStorage.getItem('StartAdventure');
        document.getElementById("QueckedQuests").style.display = "block";

        if (Object.values(Quests).some(value => value > 0)) {
            if (Quest1FromLocalStorage === "1" || Quest1FromLocalStorage === "2"){ // Achte darauf, dass der Wert aus dem Local Storage als Zeichenkette verglichen wird
                if (!document.getElementById("Der Start in dein neues Abenteuer")) {
                    createQuestButton("Der Start in dein neues Abenteuer");

                    // Zeige den Button an (du musst den Button nach seiner Erstellung anzeigen)
                    document.getElementById("Der Start in dein neues Abenteuer").style.display = "block";

                    document.getElementById("Der Start in dein neues Abenteuer").addEventListener("click", function(){
                        if (!document.getElementById("QuestInfoText")){
                            Questexe("QuestInfoText", "QuestMenü");
                        } else {
                            document.getElementById("QuestInfoText").remove();
                        }
                    })
                } else if (Quest1FromLocalStorage === "3") {
                    if (!document.getElementById("Der Start in dein neues Abenteuer")) {
                        createQuestButton("Der Start in dein neues Abenteuer");
                
                        // Zeige den Button an (du musst den Button nach seiner Erstellung anzeigen)
                        document.getElementById("Der Start in dein neues Abenteuer").style.display = "none";
                    }
                }
            }
        }
        document.getElementById("QueckedQuests").addEventListener("click", function(){
            if (document.getElementById("QueckedQuests").classList.contains("erledigteQuestsChecked")){
                if (Quest1FromLocalStorage === "3"){
                    if (!document.getElementById("Der Start in dein neues Abenteuer")) {
                        createQuestButton("Der Start in dein neues Abenteuer");
                
                        // Zeige den Button an (du musst den Button nach seiner Erstellung anzeigen)
                        document.getElementById("Der Start in dein neues Abenteuer").style.display = "none";
                    }
                document.getElementById("Der Start in dein neues Abenteuer").style.display = "block";
                
                document.getElementById("Der Start in dein neues Abenteuer").addEventListener("click", function(){
                    if (!document.getElementById("QuestInfoText")){
                        Questexe("QuestInfoText", "QuestMenü");
                    } else {
                        document.getElementById("QuestInfoText").remove();
                    }
                })
                }
            }else if (Quest1FromLocalStorage === "3"){
                document.getElementById("Der Start in dein neues Abenteuer").style.display = "none";
            }
        }) 
    });

    document.getElementById("Wertebutton").addEventListener("click", function () {
        let Ort = "";
        if (Werte.style.display === 'none') {
            updateValuesFromLocalStorage()
            document.getElementsByClassName("CharismaWert")[0].innerHTML = values.Charisma;
            if (Geschlechtfromlocalstorage === "Male"){
                console.log(Geschlechtfromlocalstorage)
                document.getElementsByClassName("NameWert")[0].innerHTML = "♂ " + values.username;
            } else if (Geschlechtfromlocalstorage === "Female"){
                document.getElementsByClassName("NameWert")[0].innerHTML = "♀ " + values.username;
            }

            if (maxStandort === "TorbogenWest"){
                Ort = "Westlicher Torbogen";
            } else {
                Ort = maxStandort;
            }
            document.getElementsByClassName("StandortWert")[0].innerHTML = Ort;
            Werte.style.display = 'block';
        } else {
            Werte.style.display = 'none';
        }
    });    

    document.getElementById("Startmenü").addEventListener("click", function() {
        window.location.href = "../../index.html";
    })

    document.getElementById("dev").addEventListener("click", function() {
        window.open("https://www.instagram.com/philippkraut25/", "_blank");
    })

    document.getElementById("LocationSP").addEventListener("click", function(){
        let Adminfromlocalstorage = localStorage.getItem('Admin');

        if (Adminfromlocalstorage === "135792468"){
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            changeStandort("Startpunkt");
            Startpunkt();
        } else {
            alert("Bitte aktiviere den Admin Modus im Startmenü")
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            document.getElementById("AdminTools").style.display="none";
        }
    })

    document.getElementById("LocationSO").addEventListener("click", function(){
        let Adminfromlocalstorage = localStorage.getItem('Admin');

        if (Adminfromlocalstorage === "135792468"){
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            changeStandort("Stadt");
            StadtOW();
        } else {
            alert("Bitte aktiviere zuerst den Admin Modus im Startmenü");
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            document.getElementById("AdminTools").style.display="none";
        }
    })

    document.getElementById("LocationT").addEventListener("click", function(){
        let Adminfromlocalstorage = localStorage.getItem('Admin');

        if (Adminfromlocalstorage === "135792468"){
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            changeStandort("Taverne");
            Taverne();
        } else {
            alert("Bitte aktiviere den Admin Modus im Startmenü");
            document.getElementById("AdminTools").click();
            document.getElementById("Menü").click();
            document.getElementById("AdminTools").style.display="none";
        }
    })
    function createQuestButton(QuestName){
        var button = document.createElement('button');
        var QuestContainer = document.getElementById('Questsausgeklappt');
    
        button.classList.add('btn', 'btn-light', 'mb-2');
        button.textContent = QuestName;
        button.id = QuestName;
    
        QuestContainer.appendChild(button);
    }

    document.getElementById("QueckedQuests").addEventListener("click", function() {
        let button = document.getElementById("QueckedQuests");
        button.classList.toggle("erledigteQuestsChecked");
    });
});

export function Button1Funktionen(Event){

    if (Event === "Startpunkt"){
        Startpunkt();
    } else if (Event === "Stadt"){
        StadtOW();
    } else if (Event === "Taverne"){
        Taverne();
    } else if (Event === "TorbogenWest"){
        TorbogenWest();
    } else if (Event === "TorbogenOst"){
        TorbogenOst();
    }
}

export function disableAllButtons() {
    // Alle Buttons auswählen
    var allButtons = document.querySelectorAll('button');

    // Iteriere über alle Buttons und deaktiviere sie
    allButtons.forEach(function(button) {
        button.style.display = "none";
    });
}

export function enableSpecificButtons(exceptionIds) {
    // Iteriere über die Ausnahmen (Buttons, die aktiviert bleiben sollen)
    exceptionIds.forEach(function(id) {
        // Suche den Button mit der entsprechenden ID und aktiviere ihn
        var specificButton = document.getElementById(id);
        if (specificButton) {
            specificButton.style.display = 'block';
        }
    });
}
