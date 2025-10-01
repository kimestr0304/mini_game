const storyText = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

const story = {
  start: {
    text: "You wake up in a room that smells like rust and decay. A door creaks open in the dark.",
    choices: [
      { text: "Go through the door", next: "hallway" },
      { text: "Stay where you are", next: "stay" }
    ]
  },
  hallway: {
    text: "The hallway stretches forever. Portraits on the walls watch you. One of them blinks.",
    choices: [
      { text: "Run", next: "run" },
      { text: "Stare back", next: "stare" }
    ]
  },
  stay: {
    text: "You sit in silence. Something sits beside you. Breathing.",
    choices: [
      { text: "Turn to look", next: "look" },
      { text: "Pretend to sleep", next: "sleep" }
    ]
  },
  run: {
    text: "Your footsteps echo… but so do *theirs*. Something is following.",
    choices: [
      { text: "Hide in a room", next: "hide" },
      { text: "Keep running", next: "end" }
    ]
  },
  stare: {
    text: "It smiles. It knows your name.",
    choices: [
      { text: "Whisper its name", next: "end" }
    ]
  },
  end: {
    text: "The lights go out. The story doesn’t end here — but *you* do.",
    choices: [
      { text: "Start Over", next: "start" }
    ]
  }
};

function showScene(sceneKey) {
  const scene = story[sceneKey];
  storyText.innerText = scene.text;
  choicesDiv.innerHTML = "";
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => showScene(choice.next);
    choicesDiv.appendChild(btn);
  });
}

// Start the story
showScene("start");
