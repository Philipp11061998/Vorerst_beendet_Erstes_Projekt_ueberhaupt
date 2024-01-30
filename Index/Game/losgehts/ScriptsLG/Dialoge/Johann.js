import { NPCtoSlide, NPCSlideLeft, Taverne } from "../Stadt/Taverne.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Questexe, Quests } from "../../../Quests.js";
import { changeStandort, Standorte, setInhaltBoxes } from "../../../Werte.js";
import { StadtOW } from "../Stadt/Overworld.js";
import { Sexdefinition, Buttoncreate, Inhaltboxenaktivieren } from "../../Game.js";

export function JohannDialogue(){
  $(document).ready(function () { // Warten auf das Laden des Dokuments
    let textFeld = $("#bewegendesTextfeld");
    let ButtonT1style = $("#ButtonT1");
    let ButtonQ1 = $("#Q1");

    const { derdem, diesedieser, derdie } = Sexdefinition();

    if (Quests.StartAdventure === 0 && Quests.Questblock1 === 0) {
        textFeld.text("");
        ButtonQ1.removeClass("blink"); // Entfernen der CSS-Klasse "blink"
        $("#Q1").css("display", "none");
        $("#ButtonT1").css("display", "none");
        $("#ButtonT1").text(""); // Setzen des Textinhalts auf einen leeren String

        const usernameFromLocalStorage = localStorage.getItem('username');
    
        // Aktuelle Schriftgröße abrufen und in ein Float umwandeln
        var currentFontSize = parseFloat(window.getComputedStyle(textFeld[0]).fontSize);
            
        // Neue Schriftgröße berechnen (verringern um 0.2)
        var newFontSize = currentFontSize - 0.2;
    
        // Neue Schriftgröße festlegen
        textFeld.css("fontSize", newFontSize + "px");

        let Spielername;
        
        if (usernameFromLocalStorage === "Fremder"){
          Spielername = "der Fremde";
        } else if (usernameFromLocalStorage != "Fremder"){
          Spielername = usernameFromLocalStorage;
        }

        //NPC erstellen
        NPCtoSlide("Johann", "Johann", "/Stadt/Taverne/Johann.png");
        
        NPCSlideLeft("Johann");

        setTimeout(function () {
          insertText('Quest: Der Start in dein neues Abenteuer <br>Hallo, du musst ' + Spielername + ' sein. Man spricht bereits in der ganzen Stadt von dir. Was hältst du davon, du erledigst eine Kleinigkeit für mich und ich lege ein gutes Wort für dich ein?<br><br>Belohnung:<br>+5 auf Charisma', false); 
        }, 1200);

        
        setTimeout(function () {

          // Button um die Quest anzunehmen
          var $annehmen = Buttoncreate('Annehmen', 'annehmbutton btn btn-dark', 'Annehmen', 'display: block;', '85%', '90%', 2);
          $annehmen.css("position", "fixed");

          // Button um die Quest abzulehnen
          var $ablehnen = Buttoncreate('Ablehnen', 'annehmbutton btn btn-dark', 'Ablehnen', 'display: block;', '79%', '90%', 2);
          $ablehnen.css("position", "fixed");

          // Button für QuestInfos
          var $Info = Buttoncreate('Infos', 'annehmbutton btn btn-dark', 'Infos', 'display: block;', '73%', '90%', 2);
          $Info.css("position", "fixed");

          $annehmen.click(function(){
            var questInfoText = $("#QuestInfoText");
            if (questInfoText.length > 0 && questInfoText.css("display") === "block") {
              $("#QuestInfoText").css("display", "none");
            }
            
            $("#NPCNames").css("display", "none");
            Johann.remove();
            $annehmen.remove();
            $ablehnen.remove();
            $Info.remove();

            changeQuest("StartAdventure", 1);
            changeQuest("Questblock1", 1);
            changeStandort("Stadt");
            StadtOW();
          });

          $ablehnen.click(function(){
            var questInfoText = $("#QuestInfoText");
            if (questInfoText.length > 0 && questInfoText.css("display") === "block") {
              $("#QuestInfoText").css("display", "none");
            }

            $annehmen.remove();
            $ablehnen.remove();
            $Info.remove();

            insertText("Besuche mich jederzeit wieder.", false, "", "", ButtonT1style, ButtonT2style)
            
            setTimeout(function () {
              $("#NPCNames").css("display", "none");
              Johann.remove();
              Taverne();
            }, 1500);
            

          });

          $Info.click(function() {
            Questexe("QuestInfoText", "QuestInfoLocation");
          });              
        }, 4500);
        }
      else if (Quests.StartAdventure === 1 && Quests.Questblock1 === 1){
        let buttonArrayQSA1 = [ButtonT1style]
        textFeld.text("");
        $("#ButtonT1").css("display", "none")
        $("#Q1").css("display", "none")
        ButtonT1style.text("");

        //NPC erstellen
        NPCtoSlide("Johann", "Johann", "/Stadt/Taverne/Johann.png");
        
        NPCSlideLeft("Johann");

        setTimeout(function () {
          insertText("Bitte komm erst wieder, wenn du alles erledigt hast.", true, "Zurück in die Stadt gehen", "Zurück in die Stadt gehen", ButtonT1style, ButtonT1style, ...buttonArrayQSA1 )
          setTimeout(function () {
            $("#NPCNames").css("display", "none")
            Johann.remove();
            textFeld.text("");
            $("#ButtonT1").remove();
            $("#Q1").remove();
            Taverne();
        }, 2000);
        },1200);

      }
      else if (Quests.StartAdventure === 2 && Quests.Questblock1 === 1){
        textFeld.text("");
        $("#ButtonT1").css("display", "none")
        $("#Q1").css("display", "none")
        ButtonT1style.text("");

        //NPC erstellen
        NPCtoSlide("Johann", "Johann", "/Stadt/Taverne/Johann.png");
        
        NPCSlideLeft("Johann");

        insertText("Vielen Dank. Es werden jetzt sicher noch mehr Bürger auf dich zukommen. Komm jederzeit wieder und schau ob Aufgaben für dich da sind.", true, "Zurück in die Stadt gehen", "Zurück in die Stadt gehen", ButtonT1style, ButtonT1style )
        $("#ButtonT1").remove();
        $("#Q1").remove();
        changeQuest("StartAdventure", 3);
        changeQuest("Questblock1", 3);
        setInhaltBoxes("Box1");
        
        setTimeout(function (){
          Inhaltboxenaktivieren();
          $("#NPCNames").css("display", "none")
          Johann.remove();
          textFeld.text("");
          $("#ButtonT1").remove();
          $("#Q1").remove();
          changeStandort("Stadt");
          StadtOW();
          alert("Vielen Dank fürs Spielen. Leider gibt es aktuell nicht mehr zu tun. Schau dich aber gerne noch ein wenig um :)")
        }, 3000)
      }
    });
}