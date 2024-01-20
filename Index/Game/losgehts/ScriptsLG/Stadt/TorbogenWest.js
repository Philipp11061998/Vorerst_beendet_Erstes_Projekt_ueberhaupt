import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort } from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW } from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";
import { BrutusDialogue } from "../Dialoge/Brutus.js";
import { Buttoncreate, ButtoncreateohneLocation } from "../../Game.js";


export function TorbogenWest(){
    $(document).ready(function () { // Warten auf das Laden des Dokuments
        document.getElementById('background-container').style.backgroundImage = 'url("StylesLG/Orte/Stadt/westlicherTorbogen/TorbogenWest.jpg")';

        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = $("#bewegendesTextfeld");
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
                    $("#AdminTools").css("display", "none");
                    $("#LocationSP").css("display", "none");
                    $("#LocationSO").css("display", "none");
                    $("#LocationT").css("display", "none");
                  } else if (Adminfromlocalstorage != "135792468") {
                    $("#AdminTools").css("display", "block");
                    $("#LocationSP").css("display", "block");
                    $("#LocationSO").css("display", "block");
                    $("#LocationT").css("display", "block");
                }
            }
                
            textFeld.text("");

            disableAllButtons();
            enableSpecificButtons(["ButtonTW1", "ButtonTW2","Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

            // Schriftfarbe auf Weiß setzen
            $("bewegendesTextfeld").css("color", "white");

            //Button zum Stadteingang
            var $Stadteingang = ButtoncreateohneLocation('Stadteingang', 'art1Button', 'Zum Stadteingang zurückkehren', 'display: none;');

            // leerer 2. Button
            var $Second = ButtoncreateohneLocation('SecondTW', 'art1Button', '', 'display: none;');
                        
            //Button der Stadtwache
            var $Wache = Buttoncreate('WacheWest', 'QuestKreis blink', '', 'display: none;', '35%', '42%', 2);

            let buttonArray = [$Stadteingang, $Second, $Wache]

            insertText("Du erreichst den Westlichen Torbogen. Geradeaus bleibst du im äußeren Ring und wenn du die Treppe hochgehst, dann erreichst du den inneren Stadtring. Dort leben die gehobeneren Bewohner der Stadt.", true, $Stadteingang, $Wache, "Zurück zum Stadteingang", "", ...buttonArray )

            $Stadteingang.click(function(){
                changeStandort("Stadt");
                $Stadteingang.remove();
                $Second.remove();
                $Wache.remove();
                StadtOW();
            });

            $Wache.click(function(){
            
                if (Quests.Questblock1 < 3){
                    BrutusDialogue();
                //Questblock1 beendet, sonst nichts begonnen
                } else if ((Quests.Questblock1 === 3 && KeinQuestblock2(Quests))) {                   
                        textFeld.text("");
                        disableAllButtons();
                        enableSpecificButtons(["Wertebutton"])

                    //NPC erstellen und dann sliden  
                    NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
                    NPCSlideLeft("Brutus");

                    setTimeout(function() {
                        insertText("Hallo " + usernameFromLocalStorage + " schön dich zu sehen. Leider kann ich gerade nichts für dich tun. Komm gerne ein andermal wieder.", false);
                    
                        setTimeout(function() {
                            $("#Brutus").remove();
                            $("#NPCNames").css("display", "none");
                            $Stadteingang.remove();
                            $Second.remove();
                            $Wache.remove();
                            TorbogenWest();
                        }, 3000);
                    }, 1200);
                    

                }
            })
        }
    });
}
    
function KeinQuestblock2(quests) {
    for (var quest in quests) {
        if (quest !== 'Questblock1' && quest !== 'StartAdventure' && quests[quest] !== 0) {
            return false;
        }
    }
    return true;
}
