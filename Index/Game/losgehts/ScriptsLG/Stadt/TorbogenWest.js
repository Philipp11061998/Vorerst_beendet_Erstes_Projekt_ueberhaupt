import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort } from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW } from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";
import { BrutusDialogue } from "../Dialoge/Brutus.js";


export function TorbogenWest(){
    document.body.style.backgroundImage = 'url("StylesLG/Orte/Stadt/westlicherTorbogen/TorbogenWest.jpg")';

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    let textFeld = document.getElementById("bewegendesTextfeld");
    const Adminfromlocalstorage = localStorage.getItem('Admin');
    const usernameFromLocalStorage = localStorage.getItem('username');
    const Sex = localStorage.getItem('Geschlecht');
    var derdem = "";
    var diesedieser = "";
                        
    if ( Sex === "Female" ){
        derdem = "der";
        diesedieser = "diese";
    } else if ( Sex === "Male") {
        derdem = "dem";
        diesedieser = "dieser";
    }

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

        disableAllButtons();
        enableSpecificButtons(["ButtonTW1", "ButtonTW2","Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

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
        Second.id = "SecondTW"; // Eindeutige ID zuweisen
        Second.style.display="none";
        document.body.appendChild(Second);

        //Button der Stadtwache
        var Wache = document.createElement('button');
        Wache.classList.add("QuestKreis");
        Wache.classList.add("blink");
        Wache.id = "WacheWest"; // Eindeutige ID zuweisen
        Wache.style.display= "none";
        document.body.appendChild(Wache);

        // Position in Prozent setzen
        var positionXPercent = 25.3;
        var positionYPercent = 27;

        Wache.style.left = positionXPercent + '%';
        Wache.style.top = positionYPercent + '%';
        Wache.style.zIndex = 2;

        const ButtonTW1 = document.getElementById("Stadteingang");
        const ButtonTW2 = document.getElementById("SecondTW");
        const ButtonW1 = document.getElementById("WacheWest");

        let buttonArray = [ButtonTW1, ButtonTW2, ButtonW1]

        insertText("Du erreichst den Westlichen Torbogen. Vor dir patroulliert die Stadtwache. Geradeaus bleibst du im äußeren Ring und wenn du die Treppe hochgehst, dann erreichst du den inneren Stadtring. Dort leben die gehobeneren Bewohner der Stadt.", true, ButtonTW1, ButtonW1, "Zurück zum Stadteingang", "", ...buttonArray )

        document.getElementById("Stadteingang").addEventListener("click", function(){
            changeStandort("Stadt");
            StadtOW();
        });

        ButtonW1.addEventListener("click", function(){
        
            if (Quests.Questblock1 < 3){
                BrutusDialogue();
            //Questblock1 beendet, sonst nichts begonnen
            } else if ((Quests.Questblock1 === 3 && KeinQuestblock2(Quests))) {                   
                    textFeld.textContent = "";
                    disableAllButtons();
                    enableSpecificButtons(["Wertebutton"])

                //NPC erstellen und dann sliden  
                NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
                NPCSlideLeft("Brutus");

                setTimeout(function() {
                    insertText("Hallo " + usernameFromLocalStorage + " schön dich zu sehen. Leider kann ich gerade nichts für dich tun. Komm gerne ein andermal wieder.", false);
                
                    setTimeout(function() {
                        document.getElementById("Brutus").remove();
                        document.getElementById("NPCNames").style.display = "none";
                        TorbogenWest();
                    }, 3000);
                }, 1200);
                

            }
        })
    }
}
    
function KeinQuestblock2(quests) {
    for (var quest in quests) {
        if (quest !== 'Questblock1' && quest !== 'StartAdventure' && quests[quest] !== 0) {
            return false;
        }
    }
    return true;
}
