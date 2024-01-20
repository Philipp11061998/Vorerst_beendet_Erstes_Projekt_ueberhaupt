import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons } from "../../Game.js";
import { enableSpecificButtons } from "../../Game.js";
import { StadtOW } from "./Overworld.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Quests, Questexe } from "../../../Quests.js";
import { JohannDialogue } from "../Dialoge/Johann.js";

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
      let ButtonT1style = $("#ButtonT1");
      let ButtonT2style = $("#ButtonT2");
      let ButtonQ1 = $("#Q1");
      const Adminfromlocalstorage = localStorage.getItem('Admin');

      const usernameFromLocalStorage = localStorage.getItem('username');

      let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

      if (maxStandort === "Taverne"){

      textFeld.text("");

      $("#ButtonT1").css("display", "none")
      $("#ButtonT2").css("display", "none")


      disableAllButtons();
      enableSpecificButtons(["ButtonT1", "ButtonT2","Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

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
  var buttonArray = [$("#ButtonT1"), $("#ButtonT2"), $("#Q1")]
  if (Quests.StartAdventure === 3){
    buttonArray = buttonArray.filter(button => button.attr("id") !== "Q1");
  }


    insertText("Du bist in der Taverne angekommen. Schaue dich in Ruhe um, vielleicht möchte jemand etwas von dir.", true, "Zurück in die Stadt gehen", "", ButtonT1style, ButtonT2style, ...buttonArray);
    
    setTimeout(function(){
      AllQuests();
    }, 2600)


      function AllQuests(){
        
        //Erster Questblock
        if (Quests.Questblock1 === 0 || Quests.Questblock1 === 1 || Quests.Questblock1 === 2){
          $("#Q1").css("display", "block");

          //Quest 1 
          $("#Q1").click(function(){
            JohannDialogue();
          });

          // 1. Questblock fertig, aber kein anderer ausgewählt
        } else if (Quests.Questblock1 === 3) {
          console.log("Weitere Quests folgen");
        }

      }

      $("#ButtonT1").click(function () {
          changeStandort("Stadt");
          $("#ButtonT1").css("display", "none")
          $("#ButtonT2").css("display", "none")
          ButtonT1style.text("");
          ButtonT2style.text("");
          StadtOW();
          location.reload();
      });
      
      document.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (e.key === 'ArrowUp') {
              ButtonT1style.focus();
            } else {
              ButtonT2style.focus();
            }
          } 
        });
      } else {
        location.reload();
      }
    });
}
