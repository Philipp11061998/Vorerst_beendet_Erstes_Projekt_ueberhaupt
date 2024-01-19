import { values, resetvalues, Standorte } from './Game/Werte.js';
import { impLS } from './Game/Werte.js';
import { expLS } from './Game/Werte.js';
import { AdminModeChange } from './Game/Werte.js';

$(document).ready(function () {
  values.Charisma = parseInt(localStorage.getItem('Charisma')) || 0;
  values.username = localStorage.getItem('username') || "Fremder";
  values.Name_abgefragt = parseInt(localStorage.getItem('Name_abgefragt')) || 0;

  const startButton = $("#startButton");
  const startbildschirm = $(".startbildschirm");
  const startmenü = $(".Startmenü");
  const newadventure = $("#NewGame");
  const Storage = $("#LocalStorage");
  const StorageShow = $("#LocalStorageShow");
  const weiterspielen = $("#Spielen");

  let maxStandort = Object.keys(Standorte).reduce(function (a, b) {
    return Standorte[a] > Standorte[b] ? a : b;
  });

  if (values.Name_abgefragt > 0) {
    weiterspielen.on("click", function () {
      window.location.href = "Game/losgehts/Game.html";
    });
  } else {
    weiterspielen.on("mouseenter", function () {
      $(this).addClass("disabled-hover");
      weiterspielen.on("mouseleave", function () {
        $(this).removeClass("disabled-hover");
        weiterspielen.prop("disabled", true);
        weiterspielen.css("opacity", "0.6");
        weiterspielen.css("cursor", "not-allowed");
        weiterspielen.css("backgroundColor", "gray");
      });
    });
  }

  startButton.on("click", function () {
    startbildschirm.css("display", "none");
    startmenü.css("display", "block");
  });

  newadventure.on("click", function () {
    if (typeof values.Name_abgefragt === 'undefined') {
      console.log("Name_abgefragt ist nicht definiert.");
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

  $("#Spielexp").on("click", function () {
    expLS();
  });

  $("#Spielimp").on("click", function () {
    var fileInput = $("<input>").attr({ type: 'file', accept: '.json' });

    fileInput.on("change", function (event) {
      var file = event.target.files[0];
      impLS(file);
      fileInput.remove();
      setTimeout(function () {
        location.reload();
      }, 1);
    });

    fileInput.click();
  });

  $("#Admin").on("click", function () {
    AdminModeChange();
  });

  Storage.on("click", function () {
    resetvalues();
    location.reload();
  });

  StorageShow.on("click", function () {
    alert("Werte: Charisma: " + values.Charisma + " Name: " + values.username + " Name_abgefragt: " + values.Name_abgefragt + " Standort: " + maxStandort);
  });
});
