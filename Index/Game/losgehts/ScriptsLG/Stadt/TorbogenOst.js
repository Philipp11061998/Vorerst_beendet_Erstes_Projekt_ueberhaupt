import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort} from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW} from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";
import { Buttoncreate, ButtoncreateohneLocation } from "../../Game.js";


export function TorbogenOst(){
    $(document).ready(function () { // Warten auf das Laden des Dokuments
        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = $("#bewegendesTextfeld");
        const Adminfromlocalstorage = localStorage.getItem('Admin');
        const usernameFromLocalStorage = localStorage.getItem('username');

        if (maxStandort === "TorbogenOst") {

            document.body.style.backgroundImage =  'url("StylesLG/Orte/Stadt/ostlicherTorbogen/TorbogenOst.jpg")';


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

            // Schriftfarbe auf Weiß setzen
            $("#bewegendesTextfeld").css("color", "white");

            // Button um zum Stadteingang zurückzukehren
            var $Stadteingang = ButtoncreateohneLocation('Stadteingang', 'art1Button', 'Zum Stadteingang zurückkehren', 'display: none;');

            // leerer 2. Button
            var $Second = ButtoncreateohneLocation('SecondTO', 'art1Button', '', 'display: none;');
            
            //Button der Stadtwache
            var $Wache = Buttoncreate('WacheOst', 'QuestKreis blink', '', 'display: none;', '15.3%', '21%', 2);

            disableAllButtons();
            enableSpecificButtons(["Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

            let buttonArray = []
            
            insertText(".", true, $Stadteingang, $Wache, "Zurück zum Stadteingang", "", ...buttonArray )

            $Stadteingang.click(function(){
                $Stadteingang.remove();
                $Wache.remove();
                $Second.remove();
                    changeStandort("Stadt");
                    StadtOW();
            })

            $Wache.click(function(){                
                if (!$("#Argus")){
                NPCtoSlide("Argus", "Argus", "/Stadt/ostlicherTorbogen/Argus.png");
                }
                const Argus = $("#Argus"); 
                var positionXPercent = -20;
                Argus.css("left", positionXPercent + "%");
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
    });
}