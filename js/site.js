//* Kimberly Estarda
//* Art 170 - Solo Prototype
//* I used Chat GPT and Wesbot to help run the code smoothly, I am responsible for the storyline and the layout.
//* This is an experiment with HTML and JS in creating a decent story narrative in a playable media to help set a "choose your adventure" game.

const storyText = document.getElementById("story");
flickerText(storyText);
const choicesDiv = document.getElementById("choices");

// Track how many times each scene is visited
const visited = {};

// Story Scenes
const story = {
  start: {
    image: "./img/Scene_One.png",
    text: "You wake up in a dark, abandoned room. The smell of rust and decay fills your nose. You have no idea how you got here, but a door creaks open. A dark, cold hallway stares back at you.",
    choices: [
      { text: "Go through the door", next: "hallway" },
      { text: "Stay where you are", next: "stay" }
    ]
  },
  hallway: {
    image: "./img/Hallway.png",
    text: "The hallway stretches far beyond what's possible. Every step you take has no end, the dark ahead seems to *breathe*. Something knows you're here and it's getting closer.",
    choices: [
      { text: "Run, now", next: "run" },
      { text: "Freeze. Maybe it won't see you", next: "panic" }
    ]
  },
  stay: {
    image:"./img/stay.png",
    text: "You sit in silence. Your name drips from the darkness — not spoken, but *remembered*. It sounds familiar with the way it calls out to you.",
    choices: [
      { text: "Call out", next: "call" },
      { text: "Stay still", next: "panic" }
    ]
  },
  call: {
    text: "\"Who are you?! What do you want?! Why am I here?!\"",
    choices: [
      { text: "Panic, what more can you do", next: "panic" },
      { text: "Scream, nothing will change if you do", next: "scream" }
    ]
  },
  run: {
    image: "./img/run.png",
    text: "Your footsteps echo… but so do *theirs*. Something is following. Don't stop. Keep moving.",
    choices: [
      { text: "Hide in a room", next: "hide" },
      { text: "Keep running", next: "bolt" }
    ]
  },
  panic: {
    text: "You stand still, frozen. It’s approaching. You *let* it come this close. You *wanted* this, didn’t you?",
    choices: [
      { text: "*Scream*", next: "scream" },
      { text: "Deny it", next: "deny" }
    ]
  },
  deny: {
    text: "\"That's not true! I don't want any of this! What the hell is going on!?\"",
    choices: [
      { text: "...", next: "move" }
    ]
  },
  bolt: {
    text: "Running won't help. Your path has no end, remember.",
    choices: [
      { text: "*Gasp*", next: "move" }
    ]
  },
  hide: {
    text: "The room is filled with a sour, wet smell. You hide inside an open closet. Cross your fingers. Hope you found a good hiding spot.",
    choices: [
      { text: "Cover your mouth, don't make a sound", next: "gasp" },
      { text: "*BANG*", next: "move" }
    ]
  },
  gasp: {
    text: "The floor creaks — it's headed towards the closet. A shadow makes its way to you...Breathing fills the room...",
    choices: [
      { text: "...", next: "stand" }
    ]
  },
  move: {
    text: "There's nothing you can do now... You're done... *It's* coming... *It's* here...",
    choices: [
      { text: "*SOB*", next: "stand" }
    ]
  },
  scream: {
    text: "Why you screaming? We both know this is why you are here. You *chose* this, you *wanted* this. Admit it. So why scream?",
    choices: [
      { text: "\"No, thats a lie, stop it...\"", next: "wrong" }
    ]
  },
  wrong:{
    text:"Are you sure you should be talking right now? Don't want to make yourself known, right? But at last its to late.",
    choices:[
        {text: "\"What do you mean by that?!\"", next: "stand"}
    ]
  },
  stand: {
    text: "It chuckles — a sound like bone scraping metal. \"I know you. I *remember* you,\" it whispers, each word wet with saliva. \"I have waited so long for you to return to my side.\"",
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

  const sceneImage = document.getElementById("scene-image");
  if (scene.image) {
    sceneImage.src = scene.image;
    sceneImage.style.display = "block";
  } 

  // Corrupt text slightly if visited repeatedly
  if (visited[sceneKey] > 1) {
    displayText = displayText.replace(/you/gi, "𝔶𝔬𝔲").replace(/I/gi, "👁").replace(/t/gi, "☠︎︎");
  }
  if (visited[sceneKey] > 2) {
    displayText = "▌The words don’t stay still anymore. ▌You need to leave. ▌You should not be here.";
  }

  storyText.innerText = displayText;

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
    if (Math.random() < 0.05) btnText = "⚠︎ ⚠︎ ⚠︎";

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
    const opacity = Math.random() * 0.9 + 0.8;
    element.style.opacity = opacity;

    if (Math.random() < 0.1) {
      element.style.color = `hsl(${Math.random() * 20 + 320}, 80%, 80%)`;
    } else {
      element.style.color = "#fff";
    }
  }, Math.random() * 200 + 200);
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  const bgSound = document.getElementById("bg-sound");
  bgSound.volume = 0.3;
  bgSound.play();
});

document.body.addEventListener("click", () => {
  bgSound.play();
}, { once: true });

const bgSound = document.getElementById("bg-sound");
window.addEventListener("load", () => {
  bgSound.volume = 0.3;
  bgSound.play().catch(e => console.log("Audio blocked until user interaction"));
});

setInterval(() => {
  if (Math.random() < 0.5) { 
    const whisper = new Audio("mp3/whispers.mp3");
    whisper.volume = 0.3;
    whisper.play();
  }
}, 10000);
