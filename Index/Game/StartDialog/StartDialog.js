import { values, setCharisma, setUsername, AbfrageName, changeStandort, Geschlechtchange, Soundset, SetSoundState  } from "../Werte.js";

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () { // Warten auf das Laden des Dokuments
    alert("Für das beste Erlebnis, schalte am besten den Sound ein :) (Aktuell gibt es Herausforderungen. Der Ton muss hier nach und beim Wechsel in die Stadt erneut aktiviert werden. Ich arbeite daran :D)")
    
    //Sound
    var $audioElement = $('#meinAudio');
    $audioElement.prop('muted', true);
    $audioElement.prop('loop', true);
    $audioElement.prop('volume', 0.1);
    
    if (!$('#Sound').hasClass("SoundOn") && Soundset.SoundState === "on"){
        $("#Sound").addClass("SoundOn");
    } else if ($('#Sound').hasClass("SoundOn") && Soundset.SoundState === "off") {
        $("#Sound").removeClass("SoundOn");
    }


    $('#Sound').click(function() {
        var isMuted = $audioElement.prop('muted');
        $audioElement.prop('muted', !isMuted);
        
        if (isMuted) {
            // War vorher stummgeschaltet, jetzt nicht mehr stummgeschaltet
            $("#Sound").addClass("SoundOn");
            $audioElement[0].play();
            SetSoundState("on");
        } else {
            // War vorher nicht stummgeschaltet, jetzt stummgeschaltet
            $("#Sound").removeClass("SoundOn");
            SetSoundState("off");
        }
    });
    //Ende
    
    const textFeld = $("#bewegendesTextfeld");
    const schweigenButton = $("#Schweigen");
    const nameButton = $("#Name");

    const $nameDiv = $(".Name");
    const $nameInput = $nameDiv.find("input");
    
    $nameInput.css("display", "block");

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
      textFeld.text(textToInsert.substring(0, currentIndex));
      currentIndex++;
  
      if (currentIndex <= textToInsert.length) {
          setTimeout(insertText, 30);
      } else {
          setTimeout(function () {
              nameButton.css("display", "block");
              schweigenButton.css("display", "block");
              nameButton.focus(); // Fokus auf den "Name"-Button setzen
          }, 1000);
      }
  }
    insertText();
      
    nameButton.on("click", namen);
    schweigenButton.on("click", schweigen);

    $("#MChar").click(function() {
      const Mchar = $("#MChar");
      const Wchar = $("#WChar");
    
      if (!Mchar.hasClass("selected")) {
        if (Wchar.hasClass("selected")) {
          Wchar.removeClass("selected");
        }
        Mchar.addClass("selected");
      } else {
        Mchar.removeClass("selected");
      }
    
      const nameInput = $(".Name input");
      nameInput.focus();
    });
    
    
    $("#WChar").click(function() {
      const Mchar = $("#MChar");
      const Wchar = $("#WChar");
    
      if (!Wchar.hasClass("selected")) {
        if (Mchar.hasClass("selected")) {
          Mchar.removeClass("selected");
        }
        Wchar.addClass("selected");
      } else {
        Wchar.removeClass("selected");
      }
    
      const nameInput = $(".Name input");
      nameInput.focus();
    });
    
    $(".Name input").on("keydown", function(event) {
      if (event.key === "Enter") {
        const inputText = $(this).val().trim();
        if (inputText === "") {
          nameField.text("Bitte gib einen Namen ein.");
        } else if (!$("#MChar").hasClass("selected") && !$("#WChar").hasClass("selected")) {
          alert("Bitte wähle dein Geschlecht aus.");
        } else {
          if ($("#MChar").hasClass("selected")) {
            Geschlechtchange("Male");
          } else if ($("#WChar").hasClass("selected")) {
            Geschlechtchange("Female");
          }
          if ($('.Name input').val().match(/[^a-zA-Z]/g)) {
            alert("Bitte gib nur Buchstaben ein.")
          } else {
              setUsername(inputText);
              setCharisma(5);
              AbfrageName();
              changeStandort("Startpunkt");
              window.location.href = "../losgehts/Game.html";
            }
        }
      }
    });
    

    $(document).on('keydown', function(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
          $("#Name").focus();
        } else {
          $("#Schweigen").focus();
        }
      } else if (e.key === 'Enter') {
        if (document.activeElement === $("#Name")[0]) {
          namen();
        } else if (document.activeElement === $("#Schweigen")[0]) {
          schweigen();
        }
      }
    });    
  });
});

function namen() {
  const textFeld = $("#bewegendesTextfeld");
  const nameButton = $("#Name");
  const schweigenButton = $("#Schweigen");

  nameButton.css("display", "none");
  schweigenButton.css("display", "none");
  textFeld.text("");

  const nameDiv = $(".Name");
  nameDiv.css("display", "block");

  const nameInput = nameDiv.find("input");
  if (nameInput.length) {
    $("#GeschlechterName").css("display", "block");
    nameInput.focus();
    $("#MChar").css("display", "block");
    $("#WChar").css("display", "block");
  }
}

function schweigen() {
  setUsername("Fremder");
  const textFeld = $("#bewegendesTextfeld");
  const nameButton = $("#Name");
  const schweigenButton = $("#Schweigen");

  nameButton.css("display", "none");
  schweigenButton.css("display", "none");
  textFeld.text("");
  $("#GeschlechterSchweigen").css("display", "block");

  $("#MChar").css("bottom", "38%");
  $("#WChar").css("bottom", "38%");

  $("#MChar").css("display", "block");
  $("#WChar").css("display", "block");

  $("#MChar").on("click", function() {
    Geschlechtchange("Male");
    window.location.href = "../losgehts/Game.html";
    AbfrageName();
  });

  $("#WChar").on("click", function() {
    Geschlechtchange("Female");
    window.location.href = "../losgehts/Game.html";
    AbfrageName();
  });
}
