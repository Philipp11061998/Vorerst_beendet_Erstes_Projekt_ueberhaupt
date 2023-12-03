import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { StadtOW } from "../Stadt/Overworld.js";

export function insertText(textToInsert, activateButtons = true, Button1, Button2, text1, text2) {
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
              Button1.style.display = "block";
              Button2.style.display = "block";
          }
          }, 1000);
      }
  }

  addText();
}

function insertCenteredTextWithDelayAndSlowText(textToInsert, callback) {
  // Erstelle ein div-Element für den zentrierten Text
  const centeredTextDiv = document.createElement('div');
  centeredTextDiv.id = "bewegendesTextfeld"; // Setze eine ID, damit es später leichter gefunden werden kann
  centeredTextDiv.style.position = 'fixed';
  centeredTextDiv.style.top = '50%';
  centeredTextDiv.style.left = '50%';
  centeredTextDiv.style.transform = 'translate(-50%, -50%)';
  centeredTextDiv.style.textAlign = 'center';
  centeredTextDiv.style.color = '#ffffff'; // Ändere die Textfarbe nach Bedarf

  // Füge das zentrierte Div zum Body hinzu
  document.body.appendChild(centeredTextDiv);

  // Funktion zum langsamen Einfügen des Textes
  function addTextSlowly() {
    let currentIndex = 0;
    const interval = setInterval(function () {
      centeredTextDiv.textContent = textToInsert.substring(0, currentIndex);
      currentIndex++;

      if (currentIndex > textToInsert.length) {
          
        setTimeout(function(){
          // Text vollständig eingefügt, entferne das Intervall
          clearInterval(interval);

          // Rufe die Callback-Funktion auf
          callback();

          // Entferne das zentrierte Div vom Body
          document.body.removeChild(centeredTextDiv);
        }, 1000);
        }
        
    }, 50); // Hier kannst du die Geschwindigkeit anpassen
  }

  // Verzögere die Ausführung des langsam eingefügten Textes um 'delay' Millisekunden
  setTimeout(addTextSlowly);
}


export function Startpunkt() {
    let textFeld = document.getElementById("bewegendesTextfeld");
    let ButtonSp1style = document.getElementById("ButtonSp1");
    let ButtonSp2style = document.getElementById("ButtonSp2");
    let FragezeichenKästchen = document.getElementById("Gegenstände");
    let Wertebuttonstyle = document.getElementById("Wertebutton");
    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    const Adminfromlocalstorage = localStorage.getItem('Admin');



    if (maxStandort === "Startpunkt"){
      textFeld.textContent = '';

      disableAllButtons();
      enableSpecificButtons(["Wertebutton", "ButtonSp2", "ButtonSp1", "Menü", "Startmenü", "dev", "Quests"]);

      Admin();
    
      function Admin(){
        if (Adminfromlocalstorage === "135792468"){
        document.getElementById("AdminTools").style.display="block";
        document.getElementById("LocationSP").style.display="block";
        document.getElementById("LocationSO").style.display="block";
        document.getElementById("LocationT").style.display="block";
        }
    }

      ButtonSp1style.style.display = "none";
      ButtonSp2style.style.display = "none";
      
      // Schriftfarbe auf Weiß setzen
      textFeld.style.color = 'white';
      document.body.style.backgroundImage = 'url("ScriptsLG/Startpunkt/forest.png")';
      
      insertText("Du erwachst.. Langsam stehst du auf und schaust dich um. Vor dir ein langer Weg. In der Ferne siehst du eine Stadt. Was machst du?", true, ButtonSp1style, ButtonSp2style,  "Schnellstmöglich in die Stadt gehen.", "Langsam gehen und die Umgebung erkunden." );

      ButtonSp1style.addEventListener("click", function () {
          changeStandort("Stadt");
          ButtonSp1style.style.display = "none";
          ButtonSp2style.style.display = "none";
          StadtOW();
          location.reload();
      });

      ButtonSp2style.addEventListener("click", function(){
        changeStandort("Stadt");
        ButtonSp1style.style.display = "none";
        ButtonSp2style.style.display = "none";
        textFeld.style.display = "none";
        FragezeichenKästchen.style.display = "none";
        Wertebuttonstyle.style.display = "none";
        document.body.style.backgroundImage = "none"; 
        document.getElementById("?").style.display="none";
        insertCenteredTextWithDelayAndSlowText("Langsam gehst du durch den Wald. Beunruhigt von den Geräuschen schaust du dich um. Du begegnest 3 manngroßen Obelisken mit jeweils einer Öffnung. Ansonsten ist es einfach ein normaler Waldweg. Bald schon erreichst du die Stadt..", function () {
        textFeld.style.display = "block";
        textFeld.textContent = ''; // Text zunächst leeren
        FragezeichenKästchen.style.display = "block";
        Wertebuttonstyle.style.display = "block";
        StadtOW();
        location.reload();
      });
      })

      document.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (e.key === 'ArrowUp') {
              ButtonSp1style.focus();
            } else {
              ButtonSp2style.focus();
            }
          } 
        });
    } else {
      location.reload();
    }
}
