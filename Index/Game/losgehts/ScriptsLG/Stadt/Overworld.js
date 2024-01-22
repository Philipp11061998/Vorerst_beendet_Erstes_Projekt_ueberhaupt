import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons } from "../../Game.js";
import { enableSpecificButtons } from "../../Game.js";
import { Taverne } from "./Taverne.js";
import { Startpunkt } from "../Startpunkt/Startpunkt.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { TorbogenWest } from "./TorbogenWest.js";
import { TorbogenOst } from "./TorbogenOst.js";
import { Buttoncreate, ButtoncreateohneLocation, creatediv } from "../../Game.js";
import { Soundset, Soundsetfunction } from "../../../Werte.js";

export function StadtOW(){
  $(document).ready(function () { // Warten auf das Laden des Dokuments
    let textFeld = $("#bewegendesTextfeld");

    ButtoncreateohneLocation("ButtonSOW2", "art2Button", "Zurück in den Wald laufen", "display: none;" )
    let ButtonSOW2style = $("#ButtonSOW2");

    const Adminfromlocalstorage = localStorage.getItem('Admin');
    var $audioElement = $('#meinAudio');
    var $soundButton = $('#Sound');

    //Sound
    if (Soundset.SoundState === "on") {
      while (!$soundButton.hasClass('SoundOn')) {
        $soundButton.click(); // Versuche, den Button zu "drücken"
    }
    } else {
        $audioElement.prop('muted', true);
        $("#Sound").removeClass("SoundOn");
    }
    //Ende

    function ButtonRichtungen(){
    //Erscheinen der 3 Richtungen (Taverne, Westen, Osten)

    //Taverne
    var $buttonT = ButtoncreateohneLocation('buttonT', 'buttonT noneblink btn btn-danger', '', 'display: block;');

    //Text der angezeigt wird
    var $TextTav = creatediv('TavSchild', 'TavSchild', 'Taverne', 'block');

    //West Stadt
    var $buttonW = ButtoncreateohneLocation('buttonW', 'buttonW noneblink btn btn-danger', '', 'display: block;');
    
    //Text der angezeigt wird
    var $TextTSW = creatediv('TextTSW', 'TextTSW', 'westlicher Stadtteil', 'block');

    //Ost Stadt
    var $buttonO = ButtoncreateohneLocation('buttonO', 'buttonO noneblink btn btn-danger', '', 'display: block;');
        
    //Text der angezeigt wird
    var $TextTSO = creatediv('TextTSO', 'TextTSO', 'östlicher Stadtteil', 'block');
    }
  
    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

    textFeld.text(""); // Text zunächst leeren

    $("#ButtonSOW2").css("display", "none");

    if (maxStandort === "Stadt"){

      textFeld.text("");

      disableAllButtons();
      enableSpecificButtons([ "Wertebutton", "Menü", "Startmenü", "dev", "Quests", "Sound"]);

      Admin();

      ButtonRichtungen();
    
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

    document.getElementById('background-container').style.backgroundImage = 'url("StylesLG/Orte/Stadt/Overworld/Overworld.jpg")';
      // Schriftfarbe auf Weiß setzen
      textFeld.css('color', 'white');

      insertText("Du bist am Stadteingang angekommen. Was möchtest du tun?", true , ButtonSOW2style, "", "Zurück in den Wald laufen");
      

      $("#buttonT").click(function () {
          changeStandort("Taverne");
          $("#ButtonSOW2").remove();
          $("#buttonT").remove();
          $("#TextTav").remove();
          $("#buttonW").remove();
          $("#TextTSW").remove();
          $("#buttonO").remove();
          $("#TextTSO").remove();
          $("#TavSchild").remove();
          Taverne();
          location.reload();
      });

      $("#buttonW").click(function () {
        changeStandort("TorbogenWest");
        $("#ButtonSOW2").remove();
        $("#buttonT").remove();
        $("#TextTav").remove();
        $("#buttonW").remove();
        $("#TextTSW").remove();
        $("#buttonO").remove();
        $("#TextTSO").remove();
        $("#TavSchild").remove();
        TorbogenWest();
        location.reload();
    });

    $("#buttonO").click(function () {
        changeStandort("TorbogenOst");
        $("#ButtonSOW2").remove();
        $("#buttonT").remove();
        $("#TextTav").remove();
        $("#buttonW").remove();
        $("#TextTSW").remove();
        $("#buttonO").remove();
        $("#TextTSO").remove();
        $("#TavSchild").remove();
        TorbogenOst();
        location.reload();
    });

      $("#ButtonSOW2").click(function () {
        changeStandort("Startpunkt");
        $("#ButtonSOW2").remove();
        $("#buttonT").remove();
        $("#TextTav").remove();
        $("#TavSchild").remove();
        $("#buttonW").remove();
        $("#TextTSW").remove();
        $("#buttonO").remove();
        $("#TextTSO").remove();
        Startpunkt();
        location.reload();
    });
    } else {
      location.reload();
    }
  });
}