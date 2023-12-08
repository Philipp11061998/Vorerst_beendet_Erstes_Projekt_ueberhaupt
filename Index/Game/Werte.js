import { Quests } from "./Quests.js";

export let AdminMode = {
  Admin: parseInt(localStorage.getItem('Admin')) || 0
}

export let values = {
  Charisma: parseInt(localStorage.getItem('Charisma')) || 0,
  username: localStorage.getItem('username') || "Fremder",
  Name_abgefragt: parseInt(localStorage.getItem('Name_abgefragt')) || 0
};

export function increaseCharisma(increaseBy) {
  values.Charisma += increaseBy;
  // Hier die Werte in localStorage speichern
  localStorage.setItem('Charisma', values.Charisma);
}
export function setCharisma(setas) {
 values.Charisma = setas;
localStorage.setItem('Charisma', values.Charisma);
}

export function setUsername(newUsername) {
  values.username = newUsername;
  // Hier die Werte in localStorage speichern
  localStorage.setItem('username', values.username);
}

export function AbfrageName() {
  values.Name_abgefragt = 1;
  // Hier die Werte in localStorage speichern
  localStorage.setItem('Name_abgefragt', values.Name_abgefragt);
}

export function resetvalues(){
  values.Name_abgefragt = 0;
  values.Charisma = 0;
  values.username = "Fremder";
  Standorte.Startpunkt = 0;
  Standorte.Stadt = 0;
  Standorte.Taverne = 0;
  Standorte.TorbogenWest = 0;
  Quests.StartAdventure = 0,
  Quests.Questblock1 = 0;
  Quests.Questblock2 = 0;
  Admin = 0;

  localStorage.setItem('Name_abgefragt', values.Name_abgefragt);
  localStorage.setItem('Charisma', values.Charisma);
  localStorage.setItem('username', values.username);
  localStorage.setItem('Startpunkt', Standorte.Startpunkt);
  localStorage.setItem('Stadt', Standorte.Stadt);
  localStorage.setItem('Taverne', Standorte.Taverne);
  localStorage.setItem('TorbogenWest', Standorte.TorbogenWest);
  localStorage.setItem('StartAdventure', Quests.StartAdventure);
  localStorage.setItem('Questblock1', Quests.Questblock1);
  localStorage.setItem('Questblock2', Quests.Questblock2);
  localStorage.setItem('Admin', AdminMode.Admin)

}
export let Standorte = { 
Startpunkt: parseInt(localStorage.getItem('Startpunkt')) || 1,
Stadt: parseInt(localStorage.getItem('Stadt')) || 0,
Taverne: parseInt(localStorage.getItem('Taverne')) || 0,
TorbogenWest: parseInt(localStorage.getItem('TorbogenWest')) || 0
}

export function changeStandort(Ort) {
  // Überprüfen, welche Variable übergeben wurde und entsprechend setzen
  if (Ort === "Startpunkt") {
    Standorte.Startpunkt = 1;
    Standorte.Stadt = 0;
    Standorte.Taverne = 0;
    Standorte.TorbogenWest = 0;
    localStorage.setItem('Startpunkt', Standorte.Startpunkt);
    localStorage.setItem('Stadt', Standorte.Stadt);
    localStorage.setItem('Taverne', Standorte.Taverne);
    localStorage.setItem('TorbogenWest', Standorte.TorbogenWest);

  } else if (Ort === "Stadt") {
    Standorte.Startpunkt = 0;
    Standorte.Stadt = 1;
    Standorte.Taverne = 0;
    Standorte.TorbogenWest = 0;
    localStorage.setItem('Startpunkt', Standorte.Startpunkt);
    localStorage.setItem('Stadt', Standorte.Stadt);
    localStorage.setItem('Taverne', Standorte.Taverne);
    localStorage.setItem('TorbogenWest', Standorte.TorbogenWest);

  } else if (Ort === "Taverne") {
    Standorte.Startpunkt = 0;
    Standorte.Stadt = 0;
    Standorte.Taverne = 1;
    Standorte.TorbogenWest = 0;
    localStorage.setItem('Startpunkt', Standorte.Startpunkt);
    localStorage.setItem('Stadt', Standorte.Stadt);
    localStorage.setItem('Taverne', Standorte.Taverne);
    localStorage.setItem('TorbogenWest', Standorte.TorbogenWest);
    
  } else if (Ort === "TorbogenWest"){
    Standorte.Startpunkt = 0;
    Standorte.Stadt = 0;
    Standorte.Taverne = 0;
    Standorte.TorbogenWest = 1;
    localStorage.setItem('Startpunkt', Standorte.Startpunkt);
    localStorage.setItem('Stadt', Standorte.Stadt);
    localStorage.setItem('Taverne', Standorte.Taverne);
    localStorage.setItem('TorbogenWest', Standorte.TorbogenWest);
  } else
  alert("Standort wurde nicht geändert")
}

export function AdminModeChange(){
  Admin.Admin = 135792468;
  localStorage.setItem('Admin', Admin.Admin);
  alert("Admin Modus aktiviert");
}

export function expLS() {
  // Setze die Werte im Local Storage
  localStorage.setItem('Charisma', values.Charisma.toString());
  localStorage.setItem('username', values.username);
  localStorage.setItem('Name_abgefragt', values.Name_abgefragt.toString());
  localStorage.setItem('Startpunkt', Standorte.Startpunkt.toString());
  localStorage.setItem('Stadt', Standorte.Stadt.toString());
  localStorage.setItem('Taverne', Standorte.Taverne.toString());
  localStorage.setItem('StartAdventure', Quests.StartAdventure.toString());

  // Erstelle ein exportiertes Datenobjekt mit allen Werten als Strings
  var exportedData = JSON.stringify({
    values: {
      Charisma: values.Charisma.toString(),
      username: values.username,
      Name_abgefragt: values.Name_abgefragt.toString()
    },
    Standorte: {
      Startpunkt: Standorte.Startpunkt.toString(),
      Stadt: Standorte.Stadt.toString(),
      Taverne: Standorte.Taverne.toString(),
      TorbogenWest: Standorte.TorbogenWest.toString()
    },
    Quests: {
      StartAdventure: Quests.StartAdventure.toString(),
      Questblock1: Quests.Questblock1.toString(),
      Questblock2: Quests.Questblock2.toString()
    },
    AdminMode: {
      Admin: AdminMode.Admin.toString()
    }
    // ... füge hier alle anderen zu exportierenden Werte hinzu ...
  });

  // Erstelle einen Blob und einen Download-Link
  var blob = new Blob([exportedData], { type: "application/json" });
  var link = document.createElement("a");

  // Lade den Blob herunter
  link.href = window.URL.createObjectURL(blob);
  link.download = "localStorageExport.json";
  link.click();
}


export function impLS(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    e.preventDefault(); // Füge dies am Anfang der Funktion hinzu
    try {
      var importedData = JSON.parse(e.target.result);
      console.log('Importierte Daten:', importedData);


      // Setze die importierten Werte im Local Storage
      localStorage.setItem('Charisma', importedData.values.Charisma);
      localStorage.setItem('username', importedData.values.username);
      localStorage.setItem('Name_abgefragt', importedData.values.Name_abgefragt);
      localStorage.setItem('Startpunkt', importedData.Standorte.Startpunkt);
      localStorage.setItem('Stadt', importedData.Standorte.Stadt);
      localStorage.setItem('Taverne', importedData.Standorte.Taverne);
      localStorage.setItem('TorbogenWest', importedData.Standorte.TorbogenWest);
      localStorage.setItem('StartAdventure', importedData.Quests.StartAdventure);
      localStorage.setItem('Questblock1', importedData.Quests.Questblock1);
      localStorage.setItem('Questblock2', importedData.Quests.Questblock2);
      localStorage.setItem('Admin', importedData.AdminMode.Admin)

      // ... setze hier alle anderen importierten Werte ...

    } catch (error) {
      console.error('Fehler beim Parsen der importierten Daten:', error);
      alert('Fehler beim Importieren der Daten. Siehe Konsole für Details.');
    }
  };

  reader.readAsText(file);
}

