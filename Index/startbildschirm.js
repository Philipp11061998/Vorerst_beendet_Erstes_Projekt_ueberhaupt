import { values, resetvalues, Standorte} from './Game/Werte.js';
import { impLS } from './Game/Werte.js';
import { expLS } from './Game/Werte.js';
import { AdminModeChange } from './Game/Werte.js';

window.addEventListener('load', () => {
  values.Charisma = parseInt(localStorage.getItem('Charisma')) || 0;
  values.username = localStorage.getItem('username') || "Fremder";
  values.Name_abgefragt = parseInt(localStorage.getItem('Name_abgefragt')) || 0;

  
});

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const startbildschirm = document.querySelectorAll(".startbildschirm");
  const startmenü = document.querySelectorAll(".Startmenü"); // Beachte die Verwendung von "querySelectorAll"
  const newadventure = document.getElementById("NewGame")
  const Storage = document.getElementById("LocalStorage")
  const StorageShow = document.getElementById("LocalStorageShow")
  const weiterspielen = document.getElementById("Spielen")
  let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

  if (values.Name_abgefragt > 0){
    weiterspielen.addEventListener("click", function(){
    
      window.location.href = "Game/losgehts/Game.html";
    
    })
    }
    else {
    
      weiterspielen.addEventListener("mouseenter", function(){
        this.classList.add("disabled-hover");
        weiterspielen.addEventListener("mouseleave", function () {
          this.classList.remove("disabled-hover"); // Entfernen Sie die Klasse beim Verlassen des Buttons
          weiterspielen.disabled = true; // Button deaktivieren
          weiterspielen.style.opacity = "0.6"; // Setzen Sie die Transparenz auf 60% (ausgegraut)
          weiterspielen.style.cursor = "not-allowed"; // Zeigt den nicht-erlaubten Cursor an
          weiterspielen.style.backgroundColor = "gray"; // Setzen Sie die Hintergrundfarbe auf Grau
        });
      })
    }

  startButton.addEventListener("click", function () {
    // Verstecke alle Elemente mit der "startbildschirm"-Klasse
    startbildschirm.forEach(function (element) {
      element.style.display = "none";
    });

    // Zeige alle Elemente mit der "Startmenü"-Klasse an
    startmenü.forEach(function (element) {
      element.style.display = "block";
    });
  });
    
  newadventure.addEventListener("click", function(){
    if (typeof values.Name_abgefragt === 'undefined') {
      // Hier behandeln, wenn values.Name_abgefragt nicht definiert ist
      // Du könntest hier eine Standardaktion auswählen oder eine Fehlermeldung anzeigen

        console.log("Name_abgefragt ist nicht definiert.")
    } else if (parseInt(values.Name_abgefragt, 10) === 0) {
        window.location.href = "Game/StartDialog/StartDialog.html";
    } else if (parseInt(values.Name_abgefragt, 10) > 0) {
      var bestaetigung = window.confirm('Hiermit wird dein Spielstand gelöscht. Bist du sicher, dass du fortfahren willst?');
        if (bestaetigung) {
          resetvalues();
          window.location.href = "Game/StartDialog/StartDialog.html";
        }
    } 
});

document.getElementById("Spielexp").addEventListener("click", function(){
  expLS();
})

document.getElementById("Spielimp").addEventListener("click", function () {
  // Erstelle ein unsichtbares Input-Element vom Typ "file"
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  // Füge das Input-Element zum DOM hinzu
  document.body.appendChild(fileInput);

  // Füge den Event-Listener zum unsichtbaren Datei-Upload-Element hinzu
  fileInput.addEventListener("change", function (event) {
    var file = event.target.files[0];

    // Rufe die Funktion impLS auf und übergebe die ausgewählte Datei
    impLS(file);

    // Entferne das unsichtbare Input-Element vom DOM
    document.body.removeChild(fileInput);

    // Löse das Neuladen der Seite nach einer Verzögerung von 1000 Millisekunden (1 Sekunde) aus
    setTimeout(function () {
      location.reload();
    }, 1);
  });

  // Trigger den Klick auf das unsichtbare Datei-Upload-Element
  fileInput.click();
});

document.getElementById("Admin").addEventListener("click", function(){
  AdminModeChange();
})


Storage.addEventListener("click", function(){
  resetvalues();
  location.reload();
});

StorageShow.addEventListener("click", function(){
  alert("Werte: " + "Charisma: " + values.Charisma + " Name: " + values.username + " Name_abgefragt: " + values.Name_abgefragt + " Standort: " + maxStandort);

});
});
