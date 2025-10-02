//* Kimberly Estarda
//* Art 170 - Solo Prototype
//* I used Chat GPT and Wesbot to help run the code smoothly, I am responsible for the storyline.
//* This is an experiment with HTML and JS in creating a decent story narrative while using a playable media.

const storyText = document.getElementById("story");
flickerText(storyText);
const choicesDiv = document.getElementById("choices");

// Track how many times each scene is visited
const visited = {};

const story = {
  start: {
    text: "You wake up in a room with the smell of rust and decay filling your nose. You have no idea how you got here, but a door creaks open. A dark, cold hallway stares back at you.",
    choices: [
      { text: "Go through the door", next: "hallway" },
      { text: "Stay where you are", next: "stay" }
    ]
  },
  hallway: {
    text: "The hallway stretches far beyond what's possible. Every step you take, the light behind you fades, and the dark ahead seems to *breathe*. Something knows you're here and it's getting closer.",
    choices: [
      { text: "Run, now", next: "run" },
      { text: "Freeze. Maybe it won't see you", next: "panic" }
    ]
  },
  stay: {
    text: "You sit in silence. Your name drips from the darkness — not spoken, but *remembered*. It sounds familiar with the way it calls to you.",
    choices: [
      { text: "Call out", next: "call" },
      { text: "Stay still", next: "panic" }
    ]
  },
  call: {
    text: "\"Who are you?! What do you want from me?! I don't know what's going on!\"",
    choices: [
      { text: "Keep running, don't stop", next: "run" },
      { text: "Scream, nothing matters now", next: "scream" }
    ]
  },
  run: {
    text: "Your footsteps echo… but so do *theirs*. Something is following. It's close.",
    choices: [
      { text: "Hide in a room", next: "hide" },
      { text: "Keep running", next: "bolt" }
    ]
  },
  panic: {
    text: "You stand still, frozen. It’s behind you now. You *let* it come this close. You *wanted* this, didn’t you?",
    choices: [
      { text: "Scream", next: "scream" },
      { text: "Deny it", next: "deny" }
    ]
  },
  deny: {
    text: "\"That's not true! I didn't want any of this! What the hell is going on!?\"",
    choices: [
      { text: "...", next: "move" }
    ]
  },
  bolt: {
    text: "Running won't help. Your path has no end.",
    choices: [
      { text: "*Gasp*", next: "stand" }
    ]
  },
  hide: {
    text: "The room is filled with a sour, wet smell. You hide inside an old, rundown dresser. Cross your fingers. Hope nothing finds you.",
    choices: [
      { text: "Cover your mouth, don't make a sound", next: "gasp" },
      { text: "You moved!? Why!?", next: "move" }
    ]
  },
  gasp: {
    text: "The floor creaks — it's leading towards the dresser. A shadow makes its way to you. Breathing fills the room, its not yours tho...",
    choices: [
      { text: "...", next: "stand" }
    ]
  },
  move: {
    text: "There's nothing you can do now... You're done...",
    choices: [
      { text: "\"*SOB*\"", next: "stand" }
    ]
  },
  scream: {
    text: "Your scream echoes through the hallway. It bolts to you, hands reaching out, grabbing your shoulders.",
    choices: [
      { text: "...", next: "stand" }
    ]
  },
  stand: {
    text: "It chuckles — a sound like bone scraping metal. \"I know you. I *remember* you,\" it whispers, each word wet with saliva. \"I have waited so long for you to come back.\"",
    choices: [
      { text: "Cover your ears", next: "end" }
    ]
  },
  end: {
    text: "Nothing matters now. The story doesn’t end here — but *you* do.",
    choices: [
      { text: "Start Over", next: "start" }
    ]
  }
};


// Show a scene
function showScene(sceneKey) {
  visited[sceneKey] = (visited[sceneKey] || 0) + 1;
  let scene = story[sceneKey];
  let displayText = scene.text;

  // Panic corruption
  if (sceneKey === "panic" && visited[sceneKey] > 1) {
    displayText = "You freeze again. Why do you always do this? *It* remembers you now. *It’s* smiling.";
  }

  // Corrupt text slightly if visited repeatedly
  if (visited[sceneKey] > 2) {
    displayText = displayText.replace(/you/gi, "𝔶𝔬𝔲").replace(/I/gi, "👁");
  }
  if (visited[sceneKey] > 4) {
    displayText = "▌The words don’t stay still anymore. ▌They are leaking. ▌You should not be here.";
  }

  storyText.innerText = displayText;

  // Mutate text a few seconds later
  setTimeout(() => {
    if (Math.random() < 0.4) {
      storyText.innerText = storyText.innerText.replace(/\./g, "…").replace(/ /g, "  ");
    }
  }, 3000);

  // Apply flicker effect
  flickerText(storyText);

  // Build choice buttons
  choicesDiv.innerHTML = "";
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");

    // Randomly distort button text
    let btnText = choice.text;
    if (choice.text === "Start Over") btnText = "It won’t matter.";
    if (Math.random() < 0.1) btnText = "Are you sure this is you?";
    if (Math.random() < 0.05) btnText = "▌▌▌";

    btn.innerText = btnText;
    btn.setAttribute("data-text", btnText);

    btn.onclick = () => {
      // Break the reset logic occasionally
      if (sceneKey === "end" && Math.random() < 0.3) {
        showScene("hallway");
      } else {
        showScene(choice.next);
      }
    };

    choicesDiv.appendChild(btn);
  });
}

// Start the story
showScene("start");

// Flickering + subtle color changes
function flickerText(element) {
  setInterval(() => {
    const opacity = Math.random() * 0.4 + 0.6;
    element.style.opacity = opacity;

    // Occasionally tint text red/purple
    if (Math.random() < 0.1) {
      element.style.color = `hsl(${Math.random() * 20 + 340}, 70%, 70%)`;
    } else {
      element.style.color = "#fff";
    }
  }, Math.random() * 200 + 200);
}