import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons } from "../../Game.js";
import { enableSpecificButtons } from "../../Game.js";
import { StadtOW } from "./Overworld.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Quests, Questexe } from "../../../Quests.js";
import { JohannDialogue } from "../Dialoge/Johann.js";

//NPC erstellen
export function NPCtoSlide(Name, ID, Location){ //Location Format Beispiel: "/Stadt/Taverne/Johann.png"
  var Name = document.createElement('div');
  var NPCName = document.getElementById("NPCNames");
  Name.style.backgroundImage = `url("StylesLG/Orte${Location}")`;
  Name.classList.add("NPCLeft");
  Name.style.display = "block";
  Name.id = ID; // Eindeutige ID zuweisen
  document.body.appendChild(Name);

  };

  //NPC reinsliden
  export function NPCSlideLeft(Element) {
    var NPC = document.getElementById(Element);
    var NPCName = Element;

    var currentPosition = parseFloat(NPC.style.left) || -20; // Aktuelle Position oder 0, falls nicht festgelegt
    var targetPosition = 5; // Zielposition in Prozent
    var increment = 0.6; // Schrittweite
  
    var slideInterval = setInterval(function () {
        currentPosition += increment;
        NPC.style.left = currentPosition + '%';
  
        if (currentPosition >= targetPosition) {
            clearInterval(slideInterval); // Schleife beenden, wenn die Zielposition erreicht ist
        }
    }, 1); // Intervall in Millisekunden zwischen den Schritten

    setTimeout(function () {
      document.getElementById("NPCNames").textContent = NPCName;
      document.getElementById("NPCNames").style.display = "block";
    }, 1200);
  }

export function Taverne(){

      // Event-Listener für Klick-Ereignisse auf dem gesamten Dokument, um alles zu löschen, was nicht da sein sollte
    document.addEventListener("click", function(event) {
      // ID des geklickten Elements abrufen
      var clickedElementId = event.target.id;

      // QuestText entfernen, wenn ein Klick aufgetreten ist und das Element nicht der Info-Button ist
      if (clickedElementId !== "InfoButton") {
        var existingQuestText = document.getElementById("QuestText");
        if (existingQuestText) {
          existingQuestText.remove();
        }
      }
    });
    let textFeld = document.getElementById("bewegendesTextfeld");
    let ButtonT1style = document.getElementById("ButtonT1");
    let ButtonT2style = document.getElementById("ButtonT2");
    let ButtonQ1 = document.getElementById("Q1");
    const Adminfromlocalstorage = localStorage.getItem('Admin');

    const usernameFromLocalStorage = localStorage.getItem('username');

    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

    if (maxStandort === "Taverne"){

    textFeld.textContent = '';

    ButtonT1style.style.display = "none";
    ButtonT2style.style.display = "none";

    disableAllButtons();
    enableSpecificButtons(["ButtonT1", "ButtonT2","Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

    Admin();
    
    function Admin(){
      if (Adminfromlocalstorage === "135792468"){
      document.getElementById("AdminTools").style.display="block";
      document.getElementById("LocationSP").style.display="block";
      document.getElementById("LocationSO").style.display="block";
      document.getElementById("LocationT").style.display="block";
      }
  }

    document.body.style.backgroundImage = 'url("StylesLG/Orte/Stadt/Taverne/Taverne.jpeg")';

    // Schriftfarbe auf Weiß setzen
    textFeld.style.color = 'white';

    let aktiv = 0;

  function insertText(textToInsert, activateButtons = true, text1, text2, Button1, Button2, ...buttonsactivate) {
    let currentIndex = 0;
    let textFeld = document.getElementById("bewegendesTextfeld");
      
    function addText() {
        textFeld.innerHTML = textToInsert.substring(0, currentIndex);
        currentIndex++;

        if (currentIndex <= textToInsert.length) {
          setTimeout(addText, 1);
        } else {
          setTimeout(function () {
            if (activateButtons) {
              Button1.textContent = text1;
              Button2.textContent = text2;

              buttonsactivate.forEach(button => {
                button.style.display = "block";
              });
            }
          }, 1000);
        }
      }

    addText();
}//Array erweitern und Filter setzen, wenn mehr QuestButton im Spiel vorhanden sind
let buttonArray = [ButtonT1style, ButtonT2style, ButtonQ1]
if (Quests.StartAdventure === 3){
    buttonArray = buttonArray.filter(button => button !== ButtonQ1)
}


  insertText("Du bist in der Taverne angekommen. Schaue dich in Ruhe um, vielleicht möchte jemand etwas von dir.", true, "Zurück in die Stadt gehen", "", ButtonT1style, ButtonT2style, ...buttonArray);
  
  setTimeout(function(){
    AllQuests();
  }, 2600)


    function AllQuests(){
      
      //Erster Questblock
      if (Quests.Questblock1 === 0 || Quests.Questblock1 === 1 || Questblock1 === 2){
        ButtonQ1.style.display = "block";
        
        //Quest 1 
        document.getElementById("Q1").addEventListener("click", function(){
          JohannDialogue();
        });

        // 1. Questblock fertig, aber kein anderer ausgewählt
      } else if (Questblock1 === 3) {
        
      }

    }

    ButtonT1style.addEventListener("click", function () {
        changeStandort("Stadt");
        ButtonT1style.style.display = "none";
        ButtonT2style.style.display = "none";
        ButtonT1style.textContent = "";
        ButtonT2style.textContent = "";
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
    
}
