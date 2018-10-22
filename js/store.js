'use strict';

const STATS = {
  gameRules: "Your task is to hunt for each of the superhero-related items within a given amount of time of 2 hours. You will be given several multi-layered clues. Each clue will lead you to the next clue. Try to find all of the items before the time runs out!",
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
    question: "What movie released in 2004 with same title as hero is also known as Big Red?",
    choices: ["Ant-Man", "Hellboy", "Deadpool", "Iron Man"],
    answer: "Hellboy",
    feedback: "Hellboy is a 2004 American superhero movie directed by Guillermo del Toro starring Ron Perlman, loosely based on the Dark Horse Comics graphic novel Hellboy: Seed of Destruction by Mike Mignola. Del Toro for years considered this film a dream project, and had always wanted to cast Ron Perlman in the lead, but could never secure a budget or studio approval. After the massive success of Blade II (2002), del Toro was offered Blade: Trinity (2004) or Hellboy, and though he briefly considered trying to schedule both in, he chose Hellboy. In the film, a demonic beast-turned superhero known as Hellboy, secretly works to keep the world safe from paranormal threats with his team, the Bureau of Paranormal Research and Defense. In the comics, the B.P.R.D. was founded in late 1944 by Professor Trevor Bruttenholm to combat various occult threats uncovered in operations against Nazi Germany. It initially had strong links to the United States Army Air Forces and was based at a military airbase in New Mexico. By 1948, the Bureau relocated to a custom built facility in Fairfield, Connecticut, but the movie was filmed entirely in the Czech Republic mainly around Prague.",
  },

  {
    question: "Which hero is also known as Wall Crawler?",
    choices: ["Superman", "Venom", "Batman", "Spider-Man"],
    answer: "Spider-Man",
    feedback: "When Kirby showed Stan Lee the first six pages he'd drawn, Lee recalled that he hated the way Kirby was doing it! Not that he did it badly--it just wasn't the character that Lee wanted; it was too heroic. Instead, Lee turned to Steve Ditko, who developed a visual style Lee found satisfactory. In August 1962, Spider-Man was first introducted in Amazing Fantasty #15 published by Marvel Comics",
  },
];

const STORE = [
  "In comic books, I am a creature that was summoned to Earth by Nazi cultist Grigori Rasputin. My real name is Anung Un Rama and I was destined to destroy the world by unleashing the Ogdru Jahad to spread darkness and chaos across existence. I have superhuman abilities that stem from my demonic heritage, but I am also the Earth's first line of defense against occult menaces. I am a large, red-skinned demon with a tail, horns, which I filed off, leaving behind the signature circular stumps on my forehead, and an over-sized right hand made of stone. I am a hero. Who am I?",
  "In the 2004 movie adaptation of the comic book hero described in Clue # 1, at the end of World War II, the Nazis attempt to open a portal to a paranormal dimension in order to defeat the Allies, but are only able to summon a baby demon who is rescued by Allied forces. Sixty years later, the Bureau of Paranormal Research and Defense protects America against dark forces the likes of Rasputin and Kroenen. This movie released on April 2nd with the same title as the hero also known in the film as Big Red played by actor Ron Perlman was directed by Guillermo del Toro. What movie am I?",
];

const API_COMICS = {
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

const API_MOVIES = {
  url: "https://comicvine.gamespot.com/api/movies/?api_key=",
  key: "07ce68f63281224c6c07468a43c3f3947c29060f",
  limit: "&limit=5",
  format: "&format=jsonp",
  callback: "&json_callback=returnResponse",
  query: "&filter=name:",
  surl: function() {
    return this.url + this.key + this.limit + this.format + this.callback + this.query;
  },
};