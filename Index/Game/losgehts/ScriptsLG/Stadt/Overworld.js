import { changeStandort } from "../../../Werte.js";
import { values, Standorte } from '../../../Werte.js';
import { disableAllButtons } from "../../Game.js";
import { enableSpecificButtons } from "../../Game.js";
import { Taverne } from "./Taverne.js";
import { Startpunkt } from "../Startpunkt/Startpunkt.js";
import { insertText } from "../Startpunkt/Startpunkt.js";
import { TorbogenWest } from "./TorbogenWest.js";
import { TorbogenOst } from "./TorbogenOst.js";

export function StadtOW(){
    let textFeld = document.getElementById("bewegendesTextfeld");
    let ButtonSOW1style = document.getElementById("ButtonSOW1");
    let ButtonSOW2style = document.getElementById("ButtonSOW2");
    const Adminfromlocalstorage = localStorage.getItem('Admin');


    function ButtonRichtungen(){
    //Erscheinen der 3 Richtungen (Taverne, Westen, Osten)

    //Taverne
      var buttonT = document.createElement('button');

      buttonT.classList.add('buttonT');
      buttonT.classList.add('noneblink');
      buttonT.classList.add('btn');
      buttonT.classList.add('btn-danger');
      buttonT.id = "buttonT";
      document.body.appendChild(buttonT);
      buttonT.style.display="block";

      var TextTav = document.createElement('div');

      TextTav.classList.add('TavSchild');
      TextTav.id = "TavSchild";
      TextTav.textContent="Taverne";
      TextTav.style.display="block";

      document.body.appendChild(TextTav);

    //West Stadt
      var buttonW = document.createElement('button');

      buttonW.classList.add('buttonW');
      buttonW.classList.add('noneblink');
      buttonW.classList.add('btn');
      buttonW.classList.add('btn-danger');
      buttonW.id = "buttonW";
      document.body.appendChild(buttonW);
      buttonW.style.display="block";

      var TextTSW = document.createElement('div');

      TextTSW.classList.add('TextTSW');
      TextTSW.id = "TextTSW";
      TextTSW.textContent="westlicher Stadtteil";
      TextTSW.style.display="block";

      document.body.appendChild(TextTSW);

    //Ost Stadt

      var buttonO = document.createElement('button');

      buttonO.classList.add('buttonO');
      buttonO.classList.add('noneblink');
      buttonO.classList.add('btn');
      buttonO.classList.add('btn-danger');
      buttonO.id = "buttonO";
      document.body.appendChild(buttonO);
      buttonO.style.display="block";

      var TextTSO = document.createElement('div');

      TextTSO.classList.add('TextTSO');
      TextTSO.id = "TextTSO";
      TextTSO.textContent="östlicher Stadtteil";
      TextTSO.style.display="block";

      document.body.appendChild(TextTSO);
    }
  
    let maxStandort = Object.keys(Standorte).reduce((a, b) => Standorte[a] > Standorte[b] ? a : b);

    textFeld.textContent = ''; // Text zunächst leeren

    ButtonSOW1style.style.display = "none";
    ButtonSOW2style.style.display = "none";

    if (maxStandort === "Stadt"){

      textFeld.textContent = '';

      disableAllButtons();
      enableSpecificButtons(["ButtonSOW2", "Wertebutton", "Menü", "Startmenü", "dev", "Quests"]);

      Admin();

      ButtonRichtungen();
    
      function Admin(){
        if (Adminfromlocalstorage === "135792468"){
        document.getElementById("AdminTools").style.display="block";
        document.getElementById("LocationSP").style.display="block";
        document.getElementById("LocationSO").style.display="block";
        document.getElementById("LocationT").style.display="block";
        }
    }

      document.body.style.backgroundImage = 'url("StylesLG/Orte/Stadt/Overworld/Overworld.jpg")';

      // Schriftfarbe auf Weiß setzen
      textFeld.style.color = 'white';

      insertText("Du bist am Stadteingang angekommen. Was möchtest du tun?", true , ButtonSOW2style, "", "Zurück in den Wald laufen");
      

      document.getElementById("buttonT").addEventListener("click", function () {
          changeStandort("Taverne");
          ButtonSOW1style.style.display = "none";
          ButtonSOW2style.style.display = "none";
          ButtonSOW1style.textContent = "";
          ButtonSOW2style.textContent = "";
          Taverne();
          location.reload();

      });

      document.getElementById("buttonW").addEventListener("click", function () {
        changeStandort("TorbogenWest");
        ButtonSOW1style.style.display = "none";
        ButtonSOW2style.style.display = "none";
        ButtonSOW1style.textContent = "";
        ButtonSOW2style.textContent = "";
        TorbogenWest();
        location.reload();

    });

      document.getElementById("buttonO").addEventListener("click", function () {
        changeStandort("TorbogenOst");
        ButtonSOW1style.style.display = "none";
        ButtonSOW2style.style.display = "none";
        ButtonSOW1style.textContent = "";
        ButtonSOW2style.textContent = "";
        TorbogenOst();
        location.reload();

    });

      ButtonSOW2style.addEventListener("click", function () {
        changeStandort("Startpunkt");
        ButtonSOW1style.style.display = "none";
        ButtonSOW2style.style.display = "none";
        ButtonSOW1style.textContent = "";
        ButtonSOW2style.textContent = "";
        Startpunkt();
        location.reload();
    });
    } else {
      location.reload();
    }
}