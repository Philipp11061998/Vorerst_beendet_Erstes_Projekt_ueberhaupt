import { Quests, changeQuest } from "../../../Quests.js";
import { Standorte, changeStandort} from "../../../Werte.js";
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { StadtOW} from "./Overworld.js";
import { NPCSlideLeft, NPCtoSlide } from "./Taverne.js";
import { Buttoncreate, ButtoncreateohneLocation } from "../../Game.js";
import { ArgusDialogues } from "../Dialoge/Argus.js";


export function TorbogenOst(){
    $(document).ready(function () { // Warten auf das Laden des Dokuments
        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = $("#bewegendesTextfeld");
        const Adminfromlocalstorage = localStorage.getItem('Admin');
        const usernameFromLocalStorage = localStorage.getItem('username');

        if (maxStandort === "TorbogenOst") {
           
            document.getElementById('background-container').style.backgroundImage = 'url("StylesLG/Orte/Stadt/ostlicherTorbogen/TorbogenOst.jpg")';


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
            var $Wache = Buttoncreate('WacheOst', 'QuestKreis blink', '', 'display: none;', '28.8%', '39%', 2);

            disableAllButtons();
            enableSpecificButtons(["Wertebutton", "Menü", "Startmenü", "dev", "Quests", "Sound"]);

            let buttonArray = []
            
            insertText("Du erreichst den östlichen Torbogen. Dieser führt in den inneren Ring der Stadt.", true, $Stadteingang, $Wache, "Zurück zum Stadteingang", "", ...buttonArray )

            $Stadteingang.click(function(){
                $Stadteingang.remove();
                $Wache.remove();
                $Second.remove();
                changeStandort("Stadt");
                StadtOW();
            })

            $Wache.click(function(){                

                $("#Stadteingang").css("display", "none");
                $("#WacheOst").css("display", "none");
                $("#SecondTO").css("display", "none");
                textFeld.text("");
                ArgusDialogues();
            })

        }
    });
}