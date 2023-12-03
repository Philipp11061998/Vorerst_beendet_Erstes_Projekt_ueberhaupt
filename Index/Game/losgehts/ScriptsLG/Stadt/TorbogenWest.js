import { Standorte } from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";


export function TorbogenWest(){
        document.addEventListener('DOMContentLoaded', function () {
        //Button um zum Stadteingang zurückzukehren
        var Stadteingang = document.createElement('button'); // Verwende das korrekte HTML-Tag "button"
        Stadteingang.classList.add("art1Button");
        Stadteingang.textContent = 'Zum Stadteingang zurückkehren';
        Stadteingang.id = "Stadteingang"; // Eindeutige ID zuweisen
        Stadteingang.style.display="none";
        document.body.appendChild(Stadteingang);

        //leerer 2. Button
        var Second = document.createElement('button'); // Verwende das korrekte HTML-Tag "button"
        Second.classList.add("art1Button");
        Second.textContent = '';
        Second.id = "SecondTW"; // Eindeutige ID zuweisen
        Second.style.display="none";
        document.body.appendChild(Second);

        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = document.getElementById("bewegendesTextfeld");
        const Adminfromlocalstorage = localStorage.getItem('Admin');
        const usernameFromLocalStorage = localStorage.getItem('username');
        const ButtonTW1 = document.getElementById("Stadteingang");
        const ButtonTW2 = document.getElementById("SecondTW");

        if (maxStandort === "TorbogenWest") {

            Admin();

            function Admin() {
                if (Adminfromlocalstorage === "135792468") {
                    document.getElementById("AdminTools").style.display = "block";
                    document.getElementById("LocationSP").style.display = "block";
                    document.getElementById("LocationSO").style.display = "block";
                    document.getElementById("LocationT").style.display = "block";
                }
            }
                
            textFeld.textContent = '';
            ButtonTW1.style.display = "none";
            ButtonTW2.style.display = "none";

            disableAllButtons();
            enableSpecificButtons(["ButtonTW1", "ButtonTW2","Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

            document.body.style.backgroundImage = 'url("StylesLG/Orte/Stadt/westlicherTorbogen/TorbogenWest.jpg")';

            // Schriftfarbe auf Weiß setzen
            textFeld.style.color = 'white';

        }
    });
}
    
