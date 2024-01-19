import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { NPCSlideLeft, NPCtoSlide } from "../Stadt/Taverne.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Quests } from "../../../Quests.js";
import { TorbogenWest } from "../Stadt/TorbogenWest.js";
import { changeStandort, Standorte } from "../../../Werte.js";
import { StadtOW } from "../Stadt/Overworld.js";

export function Sexdefinition(){
    const Sex = localStorage.getItem('Geschlecht');
    var derdem = "";
    var diesedieser = "";
    var derdie = "";
                        
    if ( Sex === "Female" ){
        derdem = "der";
        diesedieser = "diese";
        derdie = "die";
    } else if ( Sex === "Male") {
        derdem = "dem";
        diesedieser = "dieser";
        derdie = "der";
    }

    return { derdem, diesedieser, derdie }; //Hier alle Variablen einfügen, welche noch dazu kommen
}

export function BrutusDialogue(){

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    let textFeld = document.getElementById("bewegendesTextfeld");
    const Adminfromlocalstorage = localStorage.getItem('Admin');
    const usernameFromLocalStorage = localStorage.getItem('username');
    const { derdem, diesedieser, derdie } = Sexdefinition(); //Hier alle Variablen einfügen, welche noch dazu kommen



    if (Quests.StartAdventure === 1 && Quests.Questblock1 === 1){
        disableAllButtons();
        textFeld.textContent = "";
        document.getElementById("Wertebutton").style.display = "block";

        //NPC erstellen und dann sliden  
        NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
        NPCSlideLeft("Brutus");

        if (!document.getElementById("Brutus")){
            NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
            }
            const Brutus = document.getElementById("Brutus"); 
            var positionXPercent = -20;
            Brutus.style.left = positionXPercent + '%';
            NPCSlideLeft("Brutus");

        //Buttons erstellen: Ja
        var Yes = document.createElement('button');
        Yes.classList.add("art1Button");
        Yes.textContent = '';
        Yes.id = "Yes"; // Eindeutige ID zuweisen
        Yes.style.display= "none";
        document.body.appendChild(Yes);

        // Position in Prozent setzen
        var positionXPercent = 3;
        var positionYPercent = 85;

        Yes.style.left = positionXPercent + '%';
        Yes.style.top = positionYPercent + '%';
        Yes.style.zIndex = 2;

        //Buttons erstellen: Nein
        var No = document.createElement('button');
        No.classList.add("art1Button");
        No.textContent = '';
        No.id = "No"; // Eindeutige ID zuweisen
        No.style.display= "none";
        document.body.appendChild(No);

        // Position in Prozent setzen
        var positionXPercent = 3;
        var positionYPercent = 90;

        No.style.left = positionXPercent + '%';
        No.style.top = positionYPercent + '%';
        No.style.zIndex = 2;

        let buttonArray = [Yes, No];
        setTimeout(function () {


            insertText('Quest: Der Start in dein neues Abenteuer <br>Hmpf, bist du ' + diesedieser + ' ' + usernameFromLocalStorage + ' von '+ derdem +' immer alle reden?', true, Yes, No, "Ja " + derdie + " bin ich. Johann schickt mich, ich soll dir die 5 Goldstücke geben.", "Nein.. ich komme ein andermal wieder..", ...buttonArray); 
        }, 1200);

        Yes.addEventListener("click", function(){
            document.getElementById("No").remove();
            document.getElementById("Yes").remove();
            textFeld.textContent = "";
            document.getElementById("Wertebutton").style.display = "block";
            
            //Quest abgeben
            var Yes = document.createElement('button');
            Yes.classList.add("art1Button");
            Yes.textContent = '';
            Yes.id = "Yes"; // Eindeutige ID zuweisen
            Yes.style.display= "none";
            document.body.appendChild(Yes);

            // Position in Prozent setzen
            var positionXPercent = 3;
            var positionYPercent = 85;

            Yes.style.left = positionXPercent + '%';
            Yes.style.top = positionYPercent + '%';
            Yes.style.zIndex = 2;

            //Quest nicht abgeben
            var No = document.createElement('button');
            No.classList.add("art1Button");
            No.textContent = '';
            No.id = "No"; // Eindeutige ID zuweisen
            No.style.display= "none";
            document.body.appendChild(No);

            // Position in Prozent setzen
            var positionXPercent = 3;
            var positionYPercent = 90;

            No.style.left = positionXPercent + '%';
            No.style.top = positionYPercent + '%';
            No.style.zIndex = 2;

            buttonArray = [Yes, No];
            insertText('Quest: Der Start in dein neues Abenteuer <br>Ach, hat dieser reudige Hund es endlich geschafft mein Geld aufzutreiben?', true, Yes, No, "Zumindest gab er mir diese 5 Goldstücke für dich.   (Quest erledigen)", "Ich glaube ich habe mich in der Person geirrt.   (Quest nicht erledigen)", ...buttonArray); 

                Yes.addEventListener("click", function(){
                        document.getElementById("Yes").remove();
                        document.getElementById("No").remove();
                        insertText('Vielen Dank ' + usernameFromLocalStorage + ' komm jederzeit wieder.', false )
                    setTimeout(function (){
                        document.getElementById("Brutus").remove();
                        document.getElementById("NPCNames").style.display = "none";
                        changeQuest("StartAdventure", 2);
                        TorbogenWest();
                        location.reload();
                    }, 2000);
                })

                No.addEventListener("click", function(){
                    document.getElementById("Yes").remove();
                    document.getElementById("No").remove();
                    document.getElementById("Brutus").remove();
                    document.getElementById("NPCNames").style.display = "none";
                    changeStandort("Stadt");
                    StadtOW();
                })
        })
        No.addEventListener("click", function(){
            document.getElementById("Yes").remove();
            document.getElementById("No").remove();
            document.getElementById("Brutus").remove();
            document.getElementById("NPCNames").style.display = "none";
            changeStandort("Stadt");
            StadtOW();
        })

    } else if (Quests.StartAdventure === 0 && Quests.Questblock1 === 0){

        //Button zum Entschuldigen
        var Sorry = document.createElement('button');
        Sorry.classList.add("art1Button");
        Sorry.textContent = 'Entschuldigen und weggehen..';
        Sorry.id = "Sorry"; // Eindeutige ID zuweisen
        Sorry.style.display= "none";
        document.body.appendChild(Sorry);

        // Position in Prozent setzen
        var positionXPercent = 3;
        var positionYPercent = 80;

        Sorry.style.left = positionXPercent + '%';
        Sorry.style.top = positionYPercent + '%';
        Sorry.style.zIndex = 2;

        //Leerer Button fürs Layout
        var empty = document.createElement('button');
        empty.classList.add("art1Button");
        empty.textContent = '';
        empty.id = "empty"; // Eindeutige ID zuweisen
        empty.style.display= "none";
        document.body.appendChild(empty);

        // Position in Prozent setzen
        var positionXPercent = 3;
        var positionYPercent = 90;

        empty.style.left = positionXPercent + '%';
        empty.style.top = positionYPercent + '%';
        empty.style.zIndex = 2;

        const ButtonSorry = document.getElementById("Sorry");
        const Buttonempty = document.getElementById("empty");

        let buttonArray = [ButtonSorry, Buttonempty];
        NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
        textFeld.textContent = "";
        
        NPCSlideLeft("Brutus");

        let NPC = document.getElementById("Brutus");
        disableAllButtons();
        document.getElementById("Wertebutton").style.display = "block";

        setTimeout(function () {
            insertText('Nerv jemand anderen! Unbekannte haben hier nichts zu sagen!', true, ButtonSorry, Buttonempty, "Entschuldigen und gehen..", "", ...buttonArray)
        }, 1200);

        ButtonSorry.addEventListener("click", function(){
            ButtonSorry.remove();
            Buttonempty.remove();
            document.getElementById("NPCNames").style.display = "none";
            NPC.remove();
            changeStandort("Stadt");
            StadtOW();
        })
    }
}