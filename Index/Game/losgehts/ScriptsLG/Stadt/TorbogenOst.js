import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort} from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW} from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";


export function TorbogenOst(){

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    let textFeld = document.getElementById("bewegendesTextfeld");
    const Adminfromlocalstorage = localStorage.getItem('Admin');
    const usernameFromLocalStorage = localStorage.getItem('username');

    if (maxStandort === "TorbogenOst") {

        document.body.style.backgroundImage =  'url("StylesLG/Orte/Stadt/ostlicherTorbogen/TorbogenOst.jpg")';


        Admin();

        function Admin() {
            if (Adminfromlocalstorage === "135792468") {
                document.getElementById("AdminTools").style.display = "block";
                document.getElementById("LocationSP").style.display = "block";
                document.getElementById("LocationSO").style.display = "block";
                document.getElementById("LocationT").style.display = "block";
            } else if (Adminfromlocalstorage != "1593572486") {
                document.getElementById("AdminTools").style.display = "none";
                document.getElementById("LocationSP").style.display = "none";
                document.getElementById("LocationSO").style.display = "none";
                document.getElementById("LocationT").style.display = "none";
            }
        }
            
        textFeld.textContent = '';

        // Schriftfarbe auf Weiß setzen
        textFeld.style.color = 'white';

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
        Second.id = "SecondTO"; // Eindeutige ID zuweisen
        Second.style.display="none";
        document.body.appendChild(Second);

        //Button der Stadtwache
        var Wache = document.createElement('button');
        Wache.classList.add("QuestKreis");
        Wache.classList.add("blink");
        Wache.id = "WacheOst"; // Eindeutige ID zuweisen
        Wache.style.display= "none";
        document.body.appendChild(Wache);

        // Position in Prozent setzen
        var positionXPercent = 15.3;
        var positionYPercent = 21;

        Wache.style.left = positionXPercent + '%';
        Wache.style.top = positionYPercent + '%';
        Wache.style.zIndex = 2;

        const ButtonTO1 = document.getElementById("Stadteingang");
        const ButtonTO2 = document.getElementById("SecondTO");
        const ButtonW2 = document.getElementById("WacheOst");

        disableAllButtons();
        enableSpecificButtons(["Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

        let buttonArray = []
        
        insertText(".", true, ButtonTO1, ButtonW2, "Zurück zum Stadteingang", "", ...buttonArray )

        ButtonTO1.addEventListener("click", function(){
            ButtonTO1.remove();
            ButtonTO2.remove();
            ButtonW2.remove();
                changeStandort("Stadt");
                StadtOW();
        })

        ButtonW2.addEventListener("click", function (){
            
            if (!document.getElementById("Argus")){
            NPCtoSlide("Argus", "Argus", "/Stadt/ostlicherTorbogen/Argus.png");
            }
            const Argus = document.getElementById("Argus"); 
            var positionXPercent = -20;
            Argus.style.left = positionXPercent + '%';
            NPCSlideLeft("Argus");

            //Hier Code für Argus einbauen
            //ButtonW2.style.display = "none";
            //ButtonTO1.style.display = "none";
            //ButtonTO2.style.display = "none";
            //textFeld.textContent = "";
            location.reload();
        })

    } else {
        location.reload();
    }
}