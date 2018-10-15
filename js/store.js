'use strict';

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