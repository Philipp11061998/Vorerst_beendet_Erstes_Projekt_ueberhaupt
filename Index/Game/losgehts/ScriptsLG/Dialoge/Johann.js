import { NPCtoSlide, NPCSlideLeft, Taverne } from "../Stadt/Taverne.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { changeQuest, Questexe, Quests } from "../../../Quests.js";
import { changeStandort, Standorte } from "../../../Werte.js";
import { StadtOW } from "../Stadt/Overworld.js";

export function JohannDialogue(){
    let textFeld = document.getElementById("bewegendesTextfeld");
    let ButtonT1style = document.getElementById("ButtonT1");
    let ButtonT2style = document.getElementById("ButtonT2");
    let ButtonQ1 = document.getElementById("Q1");

    if (Quests.StartAdventure === 0 && Quests.Questblock1 === 0){
        textFeld.textContent = '';
        ButtonQ1.classList.remove("blink");
        ButtonQ1.style.display = "none";
        ButtonT1style.style.display = "none";
        ButtonT2style.style.display = "none";
        ButtonT1style.textContent = "";
        ButtonT2style.textContent = "";
        const usernameFromLocalStorage = localStorage.getItem('username');
        let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    
        // Aktuelle Schriftgröße abrufen und in ein Float umwandeln
        var currentFontSize = parseFloat(window.getComputedStyle(textFeld).fontSize);
    
        // Neue Schriftgröße berechnen (verringern um 0.2)
        var newFontSize = currentFontSize - 0.2;
    
        // Neue Schriftgröße festlegen
        textFeld.style.fontSize = newFontSize + "px";

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

          //Button um die Quest anzunehmen
          var annehmen = document.createElement('button'); // Verwende das korrekte HTML-Tag "button"
          annehmen.classList.add("annehmbutton");
          annehmen.classList.add("btn");
          annehmen.classList.add("btn-dark");
          annehmen.textContent = 'Annehmen';
          annehmen.id = "Annehmen"; // Eindeutige ID zuweisen
          document.body.appendChild(annehmen);

          // Position in Prozent setzen
          var positionXPercent = 85;
          var positionYPercent = 90;

          annehmen.style.position = 'fixed';
          annehmen.style.left = positionXPercent + '%';
          annehmen.style.top = positionYPercent + '%';
          annehmen.style.zIndex = 2;

          //Button um die Quest abzulehnen
          var ablehnen = document.createElement('button'); // Verwende das korrekte HTML-Tag "button"
          ablehnen.classList.add("annehmbutton");
          ablehnen.classList.add("btn");
          ablehnen.classList.add("btn-dark");
          ablehnen.textContent = 'Ablehnen';
          ablehnen.id = "Annehmen"; // Eindeutige ID zuweisen
          document.body.appendChild(ablehnen);

          // Position in Prozent setzen
          var positionXPercent = 79;
          var positionYPercent = 90;

          ablehnen.style.position = 'fixed';
          ablehnen.style.left = positionXPercent + '%';
          ablehnen.style.top = positionYPercent + '%';
          ablehnen.style.zIndex = 2;

          //Button für QuestInfos
          var Info = document.createElement('button'); // Verwende das korrekte HTML-Tag "button"
          Info.classList.add("annehmbutton");
          Info.classList.add("btn");
          Info.classList.add("btn-dark");
          Info.textContent = 'Infos';
          Info.id = "InfoButton"; // Eindeutige ID zuweisen
          document.body.appendChild(Info);

          // Position in Prozent setzen
          var positionXPercent = 73;
          var positionYPercent = 90;

          Info.style.position = 'fixed';
          Info.style.left = positionXPercent + '%';
          Info.style.top = positionYPercent + '%';
          Info.style.zIndex = 2;

          annehmen.addEventListener("click", function(){
            var questInfoText = document.getElementById("QuestInfoText");
            if (questInfoText && window.getComputedStyle(questInfoText).display === "block") {
                questInfoText.style.display = "none";
            }
            
            document.getElementById("NPCNames").style.display = "none";
            Johann.remove();
            annehmen.remove();
            ablehnen.remove();
            Info.remove();

            changeQuest("StartAdventure", 1);
            changeQuest("Questblock1", 1);
            changeStandort("Stadt");
            StadtOW();
          });

          ablehnen.addEventListener("click", function(){
            var questInfoText = document.getElementById("QuestInfoText");
            if (questInfoText && window.getComputedStyle(questInfoText).display === "block") {
                questInfoText.style.display = "none";
            }

            document.getElementById("NPCNames").style.display = "none";
            Johann.remove();
            annehmen.remove();
            ablehnen.remove();
            Info.remove();

            insertText("Besuche mich jederzeit wieder.", false, "", "", ButtonT1style, ButtonT2style)
            
            setTimeout(function () {
              ButtonQ1.classList.add("blink");
              Taverne();
            }, 1500);
            

          });

          Info.addEventListener("click", function() {
            Questexe("QuestInfoText", "QuestInfoLocation");
          });              
        }, 4500);
        }
      else if (Quests.StartAdventure === 1 && Quests.Questblock1 === 1){
        let buttonArrayQSA1 = [ButtonT1style]
        textFeld.textContent = '';
        ButtonT1style.style.display = "none";
        ButtonT2style.style.display = "none";
        ButtonQ1.style.display = "none";
        ButtonT1style.textContent = "";
        ButtonT2style.textContent = "";

        //NPC erstellen
        NPCtoSlide("Johann", "Johann", "/Stadt/Taverne/Johann.png");
        
        NPCSlideLeft("Johann");

        setTimeout(function () {
          insertText("Bitte komm erst wieder, wenn du alles erledigt hast.", true, "Zurück in die Stadt gehen", "", ButtonT1style, ButtonT2style, ...buttonArrayQSA1 )
        },1200);
      }
      else if (Quests.StartAdventure === 2 && Quests.Questblock1 === 1){
        textFeld.textContent = '';
        ButtonT1style.style.display = "none";
        ButtonT2style.style.display = "none";
        ButtonQ1.style.display = "none";
        ButtonT1style.textContent = "";
        ButtonT2style.textContent = "";

        //NPC erstellen
        NPCtoSlide("Johann", "Johann", "/Stadt/Taverne/Johann.png");
        
        NPCSlideLeft("Johann");

        setTimeout(function () {
          insertText("Vielen Dank. Es werden jetzt sicher noch mehr Bürger auf dich zukommen. Komm jederzeit wieder und schaue ob Aufgaben für dich da sind.", true, "Zurück in die Stadt gehen", "", ButtonT1style, ButtonT2style )
          ButtonT1style.style.display = "none";
          ButtonT2style.style.display = "none";
          ButtonQ1.style.display = "none";
          changeQuest("StartAdventure", 3);
          changeQuest("Questblock1", 3);
          
          setTimeout(function(){
            document.getElementById("NPCNames").style.display = "none";
            Johann.remove();
            textFeld.textContent = "";
            changeStandort("Stadt");
            StadtOW();
          }, 4000);
        }, 1200);
      }
}