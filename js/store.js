'use strict';

const STATS = {
  questionNumber: 1,
  numberCorrect: 0,
  numberWrong: 0,
};

const QSTORE = [
  {
    question: "Which hero is also known as Big Red?",
    choices: ["Batman", "Hellboy", "Deadpool", "Red Tornado"],
    answer: "Hellboy",
    feedback: "Hellboy is a fictional superhero created by writer-artist Mike Mignola. He said in an interview that Hellboy's personality is really much more him, but some of the physical stuff is his father, so it’s a bizarre combination of his father’s physicality. Mignola's father missed WWII but he was a Korean War guy, a tough guy, one of those guys who would come home with blood all over himself from getting his hand stuck in a piece of machinery. He was so leathery. You knew he could strike one of those old fashioned matches off of his calloused hands. As far as the stories go, Mignola's fascination with ghosts and monsters began at an early age, reading Dracula at age 12 introduced him to Victorian literature and folklore, from which he has never recovered. This clearly had a heavy influence on the creation of Hellboy. In August 1993, Mignola debuted the first appearance of Hellboy in San Diego Comic-Con #2 published by Dark Horse Comics.",
  },

  {
    question: "Which hero is also known as Wall Crawler?",
    choices: ["Superman", "Venom", "Batman", "Spider-Man"],
    answer: "Spider-Man",
    feedback: "When Kirby showed Stan Lee the first six pages he'd drawn, Lee recalled that he hated the way Kirby was doing it! Not that he did it badly--it just wasn't the character that Lee wanted; it was too heroic. Instead, Lee turned to Steve Ditko, who developed a visual style Lee found satisfactory. In August 1962, Spider-Man was first introducted in Amazing Fantasty #15 published by Marvel Comics",
  },

  {
    question: "Who directed Inception?",
    choices: ["Christopher Nolan", "JJ Abrams", "Ang Lee", "David Lynch"],
    answer: function() {
      return this.choices[0];
    },
    feedback: "Christopher Edward Nolan is an English film director, screenwriter, and producer who holds both British and American citizenship. Inception is a 2010 science fiction action thriller film written, co-produced, and directed by Christopher Nolan about a thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  },
];

const STORE = {
  gameRules: "Your task is to hunt for each of the superhero-related items within a given amount of time of 2 hours. You will be given several multi-layered clues. Each clue will lead you to the next clue. Try to find all of the items before the time runs out!",
  clue1: "I am a creature that was summoned to Earth by Nazi cultist Grigori Rasputin. My real name is Anung un Rama and I was destined to destroy the world by unleashing the Ogdru Jahad to spread darkness and chaos across existence. I have superhuman abilities that stem from my demonic heritage, but I am also the Earth's first line of defense against occult menaces. I am a large, red-skinned demon with a tail, horns, which I filed off, leaving behind the signature circular stumps on my forehead, and an over-sized right hand made of stone. I am a hero. Who am I?",
  clue2: "In the 2004 movie adaptation, I was altered to be an assassin and Thule Society member renowned for my swordsmanship and using signature swords of my own design. At the end of World War II, the Nazis attempt to open a portal to a paranormal dimension in order to defeat the Allies, but are only able to summon a baby demon who is rescued by Allied forces. Sixty years later, the Bureau of Paranormal Research and Defense protects America against dark forces. Which movie am I?",
  clue3: "",
};

const API = {
  url: "https://comicvine.gamespot.com/api/search/?api_key=",
  key: "07ce68f63281224c6c07468a43c3f3947c29060f",
  limit: "&limit=5",
  format: "&format=jsonp",
  callback: "&json_callback=returnResponse",
  query: "&query=",
  surl: function() {
    return this.url + this.key + this.limit + this.format + this.callback + this.query;
  },
};

// const API = {
//   url: "https://comicvine.gamespot.com/api/movies/?api_key=",
//   key: "07ce68f63281224c6c07468a43c3f3947c29060f",
//   limit: "&limit=5",
//   format: "&format=jsonp",
//   callback: "&json_callback=returnResponse",
//   filter: "&filter=name:",
//   surl: function() {
//     return this.url + this.key + this.limit + this.format + this.callback + this.filter;
//   },
// };