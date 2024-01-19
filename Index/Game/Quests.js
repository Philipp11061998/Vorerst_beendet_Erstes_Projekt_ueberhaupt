//1 bei angenommen und 2 bei abgeschlossen 3 bei abgegeben

export let Quests = {
  //Questblock 1
    StartAdventure: parseInt(localStorage.getItem('StartAdventure')) || 0,
    Questblock1: parseInt(localStorage.getItem('Questblock1')) || 0,
  //Questblock 2
    Quest2: parseInt(localStorage.getItem('Quest2')) || 0,
    Quest3: parseInt(localStorage.getItem('Quest3')) || 0,
    Quest4: parseInt(localStorage.getItem('Quest4')) || 0,
    Quest5: parseInt(localStorage.getItem('Quest5')) || 0,
    Quest6: parseInt(localStorage.getItem('Quest6')) || 0,
    Quest7: parseInt(localStorage.getItem('Quest7')) || 0,
    Questblock2: parseInt(localStorage.getItem('Questblock2')) || 0
}

export function changeQuest(welche, Wert){
    if (welche === "StartAdventure" && Wert === 1){
        Quests.StartAdventure = Wert;
    } else if (welche === "StartAdventure" && Wert === 2){
      Quests.StartAdventure = Wert;
    }else if (welche === "Questblock1" && Wert === 1){
        Quests.Questblock1 = 1;
    } else if (welche === "Questblock1" && Wert === 3){
        Quests.Questblock1 = 3;
        Quests.StartAdventure = 3;
    }
    localStorage.setItem('StartAdventure', Quests.StartAdventure);
    localStorage.setItem('Questblock1', Quests.Questblock1);
    localStorage.setItem('Questblock2', Quests.Questblock2);
} 

export function Questexe(Quest, Position) {
  var existingQuestText = $("#" + Quest);

  if (existingQuestText.length) {
      if (existingQuestText.css("display") === "block") {
          existingQuestText.css("display", "none");
      } else if (existingQuestText.css("display") === "none") {
          existingQuestText.css("display", "block");
      }
  } else {
      // Text Element für Quest Inhalt erstellen
      var QuestText = $("<div></div>").addClass(Position + " p-3 mb-2 bg-black text-white overflow-auto").attr("id", Quest);

      // Überschrift erstellen
      var header = $("<h1></h1>").addClass("headerQuest").attr("id", "HeaderQuest").text("Info");

      // Text erstellen
      var textContent = $("<p></p>").text("Gehe die westliche Straße entlang. Am Ende wirst du der westlichen Stadtwache begegnen. Ich schulde dieser Wache noch Geld. Gib ihm bitte diese 5 Goldstücke für mich und kehre dann wieder zurück.");

      // Header und Text zu QuestText hinzufügen
      QuestText.append(header, textContent);

      // Füge QuestText zum Dokument hinzu
      $("body").append(QuestText);
  }
}

