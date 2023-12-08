import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort } from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW } from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";


export function TorbogenWest(){
    document.body.style.backgroundImage = 'url("StylesLG/Orte/Stadt/westlicherTorbogen/TorbogenWest.jpg")';

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    let textFeld = document.getElementById("bewegendesTextfeld");
    const Adminfromlocalstorage = localStorage.getItem('Admin');
    const usernameFromLocalStorage = localStorage.getItem('username');

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
                if (Quests.StartAdventure === 1 && Quests.Questblock1 === 1){
                    disableAllButtons();
                    textFeld.textContent = "";

                    //NPC erstellen und dann sliden  
                    NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
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

                    buttonArray = [Yes, No];
                    setTimeout(function () {
                        insertText('Quest: Der Start in dein neues Abenteuer <br>Hmpf, bist du dieser ' + usernameFromLocalStorage + ' von dem immer alle reden?', true, Yes, No, "Ja der bin ich. Johann schickt mich, ich soll dir die 5 Goldstücke geben.", "Nein.. ich komme ein andermal wieder..", ...buttonArray); 
                    }, 1200);

                    Yes.addEventListener("click", function(){
                        document.getElementById("No").remove();
                        document.getElementById("Yes").remove();
                        disableAllButtons();
                        textFeld.textContent = "";
                        
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

                    buttonArray = [ButtonSorry, Buttonempty];
                    NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
                    textFeld.textContent = "";
                    
                    NPCSlideLeft("Brutus");

                    let NPC = document.getElementById("Brutus");
                    disableAllButtons();

                    setTimeout(function () {
                        insertText('Nerv jemand anderen! Unbekannte haben hier nichts zu sagen!', true, ButtonSorry, Buttonempty, "Entschuldigen und gehen..", "", ...buttonArray)
                    }, 1200);

                    ButtonSorry.addEventListener("click", function(){

                        document.getElementById("NPCNames").style.display = "none";
                        NPC.remove();
                        changeStandort("Stadt");
                        StadtOW();
                    })
                
                }
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
