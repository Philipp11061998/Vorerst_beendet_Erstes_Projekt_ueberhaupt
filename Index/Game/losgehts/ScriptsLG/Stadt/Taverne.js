import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { Buttoncreate, ButtoncreateohneLocation, disableAllButtons } from "../../Game.js";
import { enableSpecificButtons } from "../../Game.js";
import { StadtOW } from "./Overworld.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Quests, Questexe } from "../../../Quests.js";
import { JohannDialogue } from "../Dialoge/Johann.js";
import { Soundset, Soundsetfunction } from "../../../Werte.js";

// NPC erstellen
export function NPCtoSlide(Name, ID, Location) {
  var $Name = $('<div>', {
      id: ID,
      class: 'NPCLeft',
      css: {
          backgroundImage: `url("StylesLG/Orte${Location}")`,
          display: 'block'
      },
      text: ''
  });

  $('body').append($Name);
}

// NPC reinsliden
export function NPCSlideLeft(Element) {
  var $NPC = $('#' + Element);
  var NPCName = Element;

  $NPC.css('left', '-20%'); // Setzen Sie die Ausgangsposition auf -20%
  var currentPosition = -20; // Aktuelle Position auf -20 setzen
  var targetPosition = 5; // Zielposition in Prozent
  var increment = 0.6; // Schrittweite

  var slideInterval = setInterval(function () {
      currentPosition += increment;
      $NPC.css('left', currentPosition + '%');

      if (currentPosition >= targetPosition) {
          clearInterval(slideInterval); // Schleife beenden, wenn die Zielposition erreicht ist
      }
  }, 1); // Intervall in Millisekunden zwischen den Schritten

  setTimeout(function () {
      $('#NPCNames').text(NPCName).css('display', 'block');
  }, 1200);
}



  export function Taverne(){
    $(document).ready(function () { // Warten auf das Laden des Dokuments
      // Event-Listener für Klick-Ereignisse auf dem gesamten Dokument, um alles zu löschen, was nicht da sein sollte
      $(document).on("click", function(event) {
        // ID des geklickten Elements abrufen
        var clickedElementId = event.target.id;
    
        // QuestText entfernen, wenn ein Klick aufgetreten ist und das Element nicht der Info-Button ist
        if (clickedElementId !== "InfoButton") {
            var existingQuestText = $("#QuestText");
            if (existingQuestText.length > 0) {
                existingQuestText.remove();
            }
        }
    });
      let textFeld = $("#bewegendesTextfeld");
      ButtoncreateohneLocation("ButtonT1", "art1Button", "Zurück in die Stadt gehen", "display: none;")
      let ButtonT1style = $("#ButtonT1");
      const Adminfromlocalstorage = localStorage.getItem('Admin');
      const usernameFromLocalStorage = localStorage.getItem('username');

      let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

      if (maxStandort === "Taverne"){

      textFeld.text("");

      $("#ButtonT1").css("display", "none")


      disableAllButtons();
      enableSpecificButtons(["Wertebutton", "Menü", "Startmenü", "dev", "Quests", "Sound"]);

      Admin();
      
      function Admin(){
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

    document.getElementById('background-container').style.backgroundImage = 'url("StylesLG/Orte/Stadt/Taverne/Taverne.jpeg")';

      // Schriftfarbe auf Weiß setzen
      $("bewegendesTextfeld").css("color", "white");

      function insertText(textToInsert, activateButtons = true, text1, text2, Button1, Button2, ...buttonsactivate) {
      let currentIndex = 0;
      let textFeld = $("#bewegendesTextfeld");
        
      function addText() {
        textFeld.html(textToInsert.substring(0, currentIndex));
        currentIndex++;
        buttonArray = buttonsactivate;
    
        if (currentIndex <= textToInsert.length) {
            setTimeout(addText, 1);
        } else {
            setTimeout(function () {
                if (activateButtons) {
                  Button1.text(text1);
                  Button2.text(text2);
    
                  // Loop durch das Array und setze das Display für jedes Element
                  for (var i = 0; i < buttonArray.length; i++) {
                    buttonArray[i].css("display", "block");
                  }              
                }
            }, 1000);
        }
    }
    
    addText();
  }//Array erweitern und Filter setzen, wenn mehr QuestButton im Spiel vorhanden sind
  var buttonArray = [$("#ButtonT1")]


    insertText("Du bist in der Taverne angekommen. Schaue dich in Ruhe um, vielleicht möchte jemand etwas von dir.", true, "Zurück in die Stadt gehen", "Zurück in die Stadt gehen", ButtonT1style, ButtonT1style, ...buttonArray);
    
    setTimeout(function(){
      AllQuests();
    }, 1500)


      function AllQuests(){
        
        //Erster Questblock
        if (Quests.Questblock1 === 0 || Quests.Questblock1 === 1 || Quests.Questblock1 === 2){
          Buttoncreate("Q1", "btn btn-danger blink", "", "display: none;", "73.5%", "44%", 2)
          $("#Q1").css("display", "block");

          //Quest 1 
          $("#Q1").click(function(){
            JohannDialogue();
            $("#ButtonT1").remove();
          });

          // 1. Questblock fertig, aber kein anderer ausgewählt
        } else if (Quests.Questblock1 === 3) {
          console.log("Weitere Quests folgen");
        }

      }

      $("#ButtonT1").click(function () {
          changeStandort("Stadt");
          $("#ButtonT1").remove();
          ButtonT1style.text("");
          StadtOW();
          location.reload();

          
      });
      } else {
        location.reload();
      }
    });
}
