import { values, setCharisma, setUsername, AbfrageName, changeStandort } from "../Werte.js";

document.addEventListener("DOMContentLoaded", function () {
  const textFeld = document.getElementById("bewegendesTextfeld");
  const schweigenButton = document.getElementById("Schweigen");
  const nameButton = document.getElementById("Name");

  const nameDiv = document.querySelector(".Name");
  const nameInput = nameDiv.querySelector("input");
  nameInput.style.display = "block";

  const charismaFromLocalStorage = localStorage.getItem('Charisma');
  if (charismaFromLocalStorage !== null) {
    values.Charisma = parseInt(charismaFromLocalStorage);
  }

  const usernameFromLocalStorage = localStorage.getItem('username');
  if (usernameFromLocalStorage !== null) {
    values.username = usernameFromLocalStorage;
  }
    
  const textToInsert = "W.... w.. wo bin ich? Wer bin ich?";

  let currentIndex = 0;

  function insertText() {
    textFeld.textContent = textToInsert.substring(0, currentIndex);
    currentIndex++;

    if (currentIndex <= textToInsert.length) {
      setTimeout(insertText, 30);
    } else {
      setTimeout(function () {
        nameButton.style.display = "block";
        schweigenButton.style.display = "block";
        nameButton.focus(); // Fokus auf den "Name"-Button setzen
      }, 1000);
    }
  }

  insertText();
    
  nameButton.addEventListener("click", namen); // Ohne ()

  schweigenButton.addEventListener("click", schweigen);

  nameInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" ) {
      const inputText = nameInput.value.trim();
      if (inputText === "") {
        nameField.textContent = "Bitte gib einen Namen ein.";
      } else {
        setUsername(inputText);
        setCharisma(5);
        AbfrageName();
        changeStandort("Startpunkt");
        window.location.href = "../losgehts/Game.html";
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (e.key === 'ArrowUp') {
        nameButton.focus();
      } else {
        schweigenButton.focus();
      }
    } else if (e.key === 'Enter') {
      if (document.activeElement === nameButton) {
        namen();
      } else if (document.activeElement === schweigenButton) {
        schweigen();
      }
    }
  });
});

function namen() { 
  const textFeld = document.getElementById("bewegendesTextfeld");
  const nameButton = document.getElementById("Name");
  const schweigenButton = document.getElementById("Schweigen");
      
  nameButton.style.display = "none";
  schweigenButton.style.display = "none";
  textFeld.textContent = '';
  
  const nameDiv = document.querySelector(".Name");
  nameDiv.style.display = "block";
  
  const nameInput = nameDiv.querySelector("input");
  if (nameInput) {
    nameInput.focus();
  }
}

function schweigen() {
  setUsername("Fremder");
  window.location.href = "../losgehts/Game.html";
  AbfrageName();
}