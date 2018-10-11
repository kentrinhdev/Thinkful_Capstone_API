'use strict';

const STORE = {
  gameRules: "Your task is to hunt for each of the superhero-related items within a given amount of time of 2 hours. You will be given several multi-layered clues. Each clue will lead you to the next clue. Try to find all of the items before the time runs out!",
  clue1: "An accident left me injured and the operations that saved my life left me resembling my monstrous creations and bound me to live in a protective bodysuit. Following my injuries I had my pierced heart replaced by a mystical clockwork version which was mentally linked to my brain. This enabled me to control my cardiovascular functions, and therefore speed up or slow down my heartbeat or fake my own death by causing it to beat so fast or so slowly that it cannot be heard or felt. I am a villain. Who am I?",
  clue2: "In the 2004 movie adaptation, I was altered to be an assassin and Thule Society member renowned for my swordsmanship and using signature swords of my own design. At the end of World War II, the Nazis attempt to open a portal to a paranormal dimension in order to defeat the Allies, but are only able to summon a baby demon who is rescued by Allied forces. Sixty years later, the Bureau of Paranormal Research and Defense protects America against dark forces. Which movie am I?",
  clue3: "",
};

const API = {
  url: "https://comicvine.gamespot.com/api/movies/?api_key=",
  key: "07ce68f63281224c6c07468a43c3f3947c29060f",
  limit: "&limit=5",
  format: "&format=jsonp",
  callback: "&json_callback=returnResponse",
  filter: "&filter=name:",
  surl: function() {
    return this.url + this.key + this.limit + this.format + this.callback + this.filter;
  },
};