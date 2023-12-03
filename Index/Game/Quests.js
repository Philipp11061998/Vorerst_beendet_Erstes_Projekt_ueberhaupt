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
}

export function changeQuest(welche, Wert){
    if (welche === "StartAdventure" && Wert === 1){
        Quests.StartAdventure = Wert;
    } else if (welche === "StartAdventure" && Wert === 2){
      Quests.StartAdventure = Wert;
    }
    else if (welche === "Questblock1" && Wert === 1){
        Quests.Questblock1 = 1;
    } else if (welche === "Questblock1" && Wert === 3){
        Quests.Questblock1 = 3;
        Quests.StartAdventure = 3;
    }
    localStorage.setItem('StartAdventure', Quests.StartAdventure);
    localStorage.setItem('Questblock1', Quests.Questblock1);
} 

export function Questexe(Quest, Position){
  //Klassen (Position):
  //QuestMenü für TopLevel Menü
  //QuestInfo für Taverne
    var existingQuestText = document.getElementById(Quest);
              
    if (existingQuestText) {
      var computedStyle = window.getComputedStyle(existingQuestText);
      if (computedStyle.display === "block") {
        existingQuestText.style.display = "none";
      } else if (computedStyle.display === "none") {
        existingQuestText.style.display = "block";
      }
    } else {
      //Text Element für Quest Inhalt erstellen
      var QuestText = document.createElement('div');
      QuestText.classList.add(Position);
      QuestText.classList.add("p-3");
      QuestText.classList.add("mb-2");
      QuestText.classList.add("bg-black");
      QuestText.classList.add("text-white");
      QuestText.classList.add("overflow-auto");
      QuestText.id = Quest; // Eindeutige ID zuweisen
  
      // Überschrift erstellen
      var header = document.createElement('h1');
      header.classList.add("headerQuest");
      header.id = "HeaderQuest";
      header.textContent = "Info";
  
      // Text erstellen
      var textContent = document.createElement('p');
      textContent.textContent = "Gehe die westliche Straße entlang. Am Ende wirst du der westlichen Stadtwache begegnen. Ich schulde dieser Wache noch Geld. Gib ihm bitte diese 5 Goldstücke für mich und kehre dann wieder zurück.";
  
      // Header und Text zu QuestText hinzufügen
      QuestText.appendChild(header);
      QuestText.appendChild(textContent);
  
      // Füge QuestText zum Dokument hinzu
      document.body.appendChild(QuestText);
    }
}
