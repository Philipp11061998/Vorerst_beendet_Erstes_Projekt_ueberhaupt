import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons, enableSpecificButtons } from "../../Game.js";
import { StadtOW } from "../Stadt/Overworld.js";

export function insertText(textToInsert, activateButtons = true, $Button1, $Button2, text1, text2) {
  $(document).ready(function () {
    let currentIndex = 0;
    let $textFeld = $("#bewegendesTextfeld");
    let Button1 = $($Button1); // Auswahl eines Elements anhand seiner ID
    let Button2 = $($Button2); // Auswahl eines Elements anhand seiner ID

    function addText() {
      $textFeld.html(textToInsert.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex <= textToInsert.length) {
        setTimeout(addText, 0);
      } else {
        setTimeout(function () {
          if (activateButtons) {
            Button1.text(text1);
            Button2.text(text2);
            Button1.css("display", "block");
            Button2.css("display", "block");
          }
        }, 1200);
      }
    }

    addText();
  });
}




function insertCenteredTextWithDelayAndSlowText(textToInsert, callback) {
  // Erstelle ein div-Element für den zentrierten Text
  const $centeredTextDiv = $('<div>', {
    id: 'bewegendesTextfeld',
    css: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#ffffff' // Ändere die Textfarbe nach Bedarf
    }
  });

  // Füge das zentrierte Div zum Body hinzu
  $('body').append($centeredTextDiv);

  // Funktion zum langsamen Einfügen des Textes
  function addTextSlowly() {
    let currentIndex = 0;
    const interval = setInterval(function () {
      $centeredTextDiv.text(textToInsert.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > textToInsert.length) {
        setTimeout(function () {
          // Text vollständig eingefügt, entferne das Intervall
          clearInterval(interval);

          // Rufe die Callback-Funktion auf
          callback();

          // Entferne das zentrierte Div vom Body
          $centeredTextDiv.remove();
        }, 1000);
      }
    }, 50); // Hier kannst du die Geschwindigkeit anpassen
  }

  // Verzögere die Ausführung des langsam eingefügten Textes um 'delay' Millisekunden
  setTimeout(addTextSlowly);
}



export function Startpunkt() {
  $(document).ready(function () { // Warten auf das Laden des Dokuments
    let textFeld = $("#bewegendesTextfeld");
    let ButtonSp1style = $("#ButtonSp1");
    let ButtonSp2style = $("#ButtonSp2");
    let FragezeichenKästchen = $("#Gegenstände");
    let Wertebuttonstyle = $("#Wertebutton");
    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);
    const Adminfromlocalstorage = localStorage.getItem('Admin');



    if (maxStandort === "Startpunkt"){
      textFeld.text('');

      disableAllButtons();
      enableSpecificButtons(["Wertebutton", "ButtonSp2", "ButtonSp1", "Menü", "Startmenü", "dev", "Quests"]);

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

      $("#ButtonSp1").css("display", "none");
      $("#ButtonSp2").css("display", "none");

      
      // Schriftfarbe auf Weiß setzen
      $("bewegendesTextfeld").css("color", "white");
      document.body.style.backgroundImage = 'url("ScriptsLG/Startpunkt/forest.png")';
      
      insertText("Du erwachst.. Langsam stehst du auf und schaust dich um. Vor dir ein langer Weg. In der Ferne siehst du eine Stadt. Was machst du?", true, ButtonSp1style, ButtonSp2style,  "Schnellstmöglich in die Stadt gehen.", "Langsam gehen und die Umgebung erkunden." );

      $("#ButtonSp1").click(function () {
          changeStandort("Stadt");
          $("#ButtonSp1").css("display", "none");
          $("#ButtonSp2").css("display", "none");
          StadtOW();
          location.reload();
      });

      $("#ButtonSp2").click(function () {
        changeStandort("Stadt");
        $("#ButtonSp1").css("display", "none");
        $("#ButtonSp2").css("display", "none");
        $("#bewegendesTextfeld").css("display", "none");
        $("#Wertebutton").css("display", "none");
        $("#Gegenstände").css("display", "none");
        $("#inhaltBox1").css("display", "none");
        $("#inhaltBox2").css("display", "none");
        $("#inhaltBox3").css("display", "none");
        $("#unbekannt").css("display", "none");
        $('body').css('backgroundImage', 'none');
        $("#Menü").css("display", "none");

        insertCenteredTextWithDelayAndSlowText("Langsam gehst du durch den Wald. Beunruhigt von den Geräuschen schaust du dich um. Du begegnest 3 manngroßen Obelisken mit jeweils einer Öffnung. Ansonsten ist es einfach ein normaler Waldweg. Bald schon erreichst du die Stadt..", function () {
        $("#bewegendesTextfeld").css("display", "block");
        textFeld.text(""); // Text zunächst leeren
        $("#Wertebutton").css("display", "block");
        $("#Gegenstände").css("display", "block");
        StadtOW();
        location.reload();
        });
      })

      $(document).keydown(function(e) {
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
  });
}
