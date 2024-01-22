import { Standorte } from "../../../Werte.js";
import { Sexdefinition } from "../../Game.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { NPCSlideLeft, NPCtoSlide } from "../Stadt/Taverne.js";
import { Quests } from "../../../Quests.js";
import { Buttoncreate } from "../../Game.js";
import { enableSpecificButtons, disableAllButtons } from "../../Game.js";
import { TorbogenOst } from "../Stadt/TorbogenOst.js";
import { changeStandort } from "../../../Werte.js";
import { StadtOW } from "../Stadt/Overworld.js";

export function ArgusDialogues(){
    $(document).ready(function () { // Warten auf das Laden des Dokuments
        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = $("#bewegendesTextfeld");
        const Adminfromlocalstorage = localStorage.getItem('Admin');
        const usernameFromLocalStorage = localStorage.getItem('username');
        const { derdem, diesedieser, derdie } = Sexdefinition(); //Hier alle Variablen einfügen, welche noch dazu kommen
        
        //Hier werden die Quests abgefragt und ggf gestartet:
        if (Object.values(Quests).includes(1) || Object.values(Quests).some(value => value > 1)) {
            if ($("#Argus").length === 0) {
                NPCtoSlide("Argus", "Argus", "/Stadt/ostlicherTorbogen/Argus.png");
            }                
            const Argus = $("Argus"); 
            var positionXPercent = -20;
            Argus.css("left", positionXPercent + "%");
            NPCSlideLeft("Argus");
                //Gerade keine aktive Quest
                if (!Object.values(Quests).includes(1)){
                    setTimeout(function() {
                        insertText("Hallo " + usernameFromLocalStorage + " schön dich zu sehen. Leider kann ich gerade nichts für dich tun. Komm gerne ein andermal wieder.", false);
                    
                        setTimeout(function() {
                            $("#Argus").remove();
                            $("#NPCNames").css("display", "none");
                            TorbogenOst();
                        }, 3000);
                    }, 1200);
                    
                }
                //Erstmal nur, damit man noch etwas machen kann 
                else {
                    // Button zum Entschuldigen
                    var $Sorry = Buttoncreate('Sorry', 'art1Button', '', 'display: none;', '3%', '80%', 2);

                    // Leerer Button fürs Layout
                    var $empty = Buttoncreate('empty', 'art1Button', '', 'display: none;', '3%', '90%', 2 )

                    let buttonArray = [$Sorry, $empty];
                    disableAllButtons();
                    $("#Wertebutton").css("display", "block");


                    setTimeout(function () {
                        insertText('Leider kann ich gerade nichts für dich tuen. Komm jederzeit wieder!', true, $Sorry, $empty, "Danke trotzdem.", "", ...buttonArray)
                    }, 1200);

                    $Sorry.click(function(){
                        $Sorry.remove();
                        $empty.remove();
                        $("#NPCNames").css("display", "none");
                        $("#Argus").remove();
                        changeStandort("Stadt");
                        StadtOW();
                        location.reload();
                    })
                }

        
        } // noch nichts angeklickt, was eine Quest sein könnte, also am Anfang des Spiels 
        else {
            // Button zum Entschuldigen
            var $Sorry = Buttoncreate('Sorry', 'art1Button', '', 'display: none;', '3%', '80%', 2);

            // Leerer Button fürs Layout
            var $empty = Buttoncreate('empty', 'art1Button', '', 'display: none;', '3%', '90%', 2 )

            let buttonArray = [$Sorry, $empty];
            disableAllButtons();
            $("#Wertebutton").css("display", "block");


            setTimeout(function () {
                insertText('Nerv jemand anderen! Unbekannte haben hier nichts zu sagen!', true, $Sorry, $empty, "Entschuldigen und gehen..", "", ...buttonArray)
            }, 1200);

            $Sorry.click(function(){
                $Sorry.remove();
                $empty.remove();
                $("#NPCNames").css("display", "none");
                NPC.remove();
                changeStandort("Stadt");
                StadtOW();
                location.reload();
            })


        }
    });
}