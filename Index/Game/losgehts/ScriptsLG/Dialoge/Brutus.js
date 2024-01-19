import { disableAllButtons, enableSpecificButtons, Buttoncreate } from "../../Game.js";
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
    $(document).ready(function () { // Warten auf das Laden des Dokuments
        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
        let textFeld = $("#bewegendesTextfeld");
        const Adminfromlocalstorage = localStorage.getItem('Admin');
        const usernameFromLocalStorage = localStorage.getItem('username');
        const { derdem, diesedieser, derdie } = Sexdefinition(); //Hier alle Variablen einfügen, welche noch dazu kommen



        if (Quests.StartAdventure === 1 && Quests.Questblock1 === 1){
            disableAllButtons();
            textFeld.text(""); 
            $("#Wertebutton").css("display", "block");

            //NPC erstellen und dann sliden  
            NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
            NPCSlideLeft("Brutus");

            if (!$("#Brutus")){
                NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
                }
                const Brutus = $("#Brutus"); 
                var positionXPercent = -20;
                Brutus.css("left", positionXPercent + '%');
                NPCSlideLeft("Brutus");

            // Button Yes erstellen
            var $Yes = Buttoncreate('Yes', 'art1Button', '', 'display: none;', '3%', '85%', 2);

            // Button Nein erstellen
            var $No = Buttoncreate('No', 'art1Button', '', 'display: none;', '3%', '90%', 2 )


            let buttonArray = [$Yes, $No];
            setTimeout(function () {
                insertText('Quest: Der Start in dein neues Abenteuer <br>Hmpf, bist du ' + diesedieser + ' ' + usernameFromLocalStorage + ' von '+ derdem +' immer alle reden?', true, $Yes, $No, "Ja " + derdie + " bin ich. Johann schickt mich, ich soll dir die 5 Goldstücke geben.", "Nein.. ich komme ein andermal wieder..", ...buttonArray); 
            }, 1200);

            $Yes.click(function() {
                $("#No").remove();
                $("#Yes").remove();
                textFeld.text(""); 
                $("#Wertebutton").css("display", "block");
                
                // Quest abgeben
                var $Yes = Buttoncreate('Yes', 'art1Button', '', 'display: none;', '3%', '85%', 2);

                // Quest nicht abgeben
                var $No = Buttoncreate('No', 'art1Button', '', 'display: none;', '3%', '90%', 2 )

                buttonArray = [$Yes, $No];
                insertText('Quest: Der Start in dein neues Abenteuer <br>Ach, hat dieser reudige Hund es endlich geschafft mein Geld aufzutreiben?', true, $Yes, $No, "Zumindest gab er mir diese 5 Goldstücke für dich.   (Quest erledigen)", "Ich glaube ich habe mich in der Person geirrt.   (Quest nicht erledigen)", ...buttonArray); 

                    $Yes.click(function(){
                            $("#Yes").remove();
                            $("#No").remove();
                            insertText('Vielen Dank ' + usernameFromLocalStorage + ' komm jederzeit wieder.', false )
                        setTimeout(function (){
                            $("#Brutus").remove();
                            $("#NPCNames").css("display", "none");
                            changeQuest("StartAdventure", 2);
                            changeStandort("Stadt");
                            StadtOW();
                            location.reload();
                        }, 2000);
                    })

                    $No.click(function(){
                        $("#Yes").remove();
                        $("#No").remove();
                        $("#Brutus").remove();
                        $("#NPCNames").css("display", "none");
                        changeStandort("Stadt");
                        StadtOW();
                    })
            })
            $No.click(function(){
                $("#Yes").remove();
                $("#No").remove();
                $("#Brutus").remove();
                $("#NPCNames").style.display = "none";
                changeStandort("Stadt");
                StadtOW();
            })

        } else if (Quests.StartAdventure === 0 && Quests.Questblock1 === 0){

            // Button zum Entschuldigen
            var $Sorry = Buttoncreate('Sorry', 'art1Button', 'Entschuldigen und weggehen..', 'display: none;', '3%', '80%', 2);

            // Leerer Button fürs Layout
            var $empty = Buttoncreate('empty', 'art1Button', '', 'display: none;', '3%', '90%', 2 )


            let buttonArray = [$Sorry, $empty];
            NPCtoSlide("Brutus", "Brutus", "/Stadt/westlicherTorbogen/Brutus.png");
            textFeld.text(""); 
            
            NPCSlideLeft("Brutus");

            let NPC = $("#Brutus");
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
            })
        }
    });
}